import Elysia, { NotFoundError } from 'elysia'
import { setup } from '@/setup'
import { UploadModel } from './model'

export default new Elysia({ prefix: '/uploads' })
	.use(UploadModel)
	.use(setup)
	.post(
		'/mangas/:id/cover',
		async ({ db, body: { cover }, params: { id }, storage, set }) => {
			const manga = await db.manga.findUnique({ where: { id } })
			if (!manga) {
				throw new NotFoundError('Manga não encontrado')
			}

			await storage.uploadFile(
				cover,
				`mangas/${id}/cover.${cover.type.split('/')[1]}`,
			)

			set.status = 201
			return { message: 'Capa do manga enviada com sucesso!' }
		},
		{
			body: 'UploadMangaCover',
			privateRoute: true,
			beforeHandle: ({ auth: { currentUser, authorization } }) => {
				authorization(currentUser, 'upload_cover', 'Manga')
			},
		},
	)
	.get(
		'/mangas/:id/cover',
		async ({ params: { id }, storage }) => {
			const cover = storage.getFile(`mangas/${id}/cover.avif`)
			const coverExists = await cover.exists()
			if (!coverExists) {
				throw new NotFoundError('Capa não encontrada!')
			}

			return new Response(cover.stream(), {
				headers: {
					'Content-Type': 'image/avif',
				},
			})
		},
		{
			publicRoute: true,
		},
	)
	.delete(
		'/mangas/:id/cover',
		async ({ params: { id }, storage }) => {
			const cover = storage.getFile(`mangas/${id}/cover.avif`)
			if (!cover.exists()) {
				throw new NotFoundError('Capa não encontrada!')
			}

			await cover.delete()

			return { success: true }
		},
		{
			privateRoute: true,
			beforeHandle: ({ auth: { currentUser, authorization } }) => {
				authorization(currentUser, 'delete_cover', 'Manga')
			},
		},
	)
	.post(
		'/chapters/:id/pages',
		async ({ body: { pages }, params: { id }, db, set, storage }) => {
			const chapter = await db.chapter.findUnique({ where: { id } })
			if (!chapter) {
				throw new NotFoundError('Capítulo não encontrado!')
			}

			if (pages.some((page) => !/^\d+\.avif$/i.test(page.name))) {
				set.status = 'Bad Request'
				throw new Error(
					'Algumas paginas estão com o nome invalido, favor usar somente sequencia numerica para ordernar as paginas!',
				)
			}

			for (const page of pages) {
				await storage.uploadFile(
					page,
					`mangas/${chapter.mangaId}/chapters/${id}/${page.name}`,
				)
			}

			set.status = 201
			return { success: true }
		},
		{
			body: 'UploadChapterPages',
			privateRoute: true,
			beforeHandle: ({ auth: { currentUser, authorization } }) => {
				authorization(currentUser, 'upload_pages', 'Chapter')
			},
		},
	)
	.get(
		'/chapters/:id/pages/:number',
		async ({ params: { id, number }, db, storage }) => {
			const chapter = await db.chapter.findUnique({ where: { id } })
			if (!chapter) {
				throw new NotFoundError('Capítulo não encontrado!')
			}

			const page = storage.getFile(
				`mangas/${chapter.mangaId}/chapters/${id}/${number}.avif`,
			)
			const pageExists = await page.exists()
			if (!pageExists) {
				throw new NotFoundError('Página do capítulo não encontrada!')
			}

			return new Response(page.stream(), {
				headers: {
					'Content-Type': 'image/avif',
				},
			})
		},
		{
			publicRoute: true,
		},
	)
	.delete(
		'/chapters/:id/pages/:number',
		async ({ params: { id, number }, db, storage }) => {
			const chapter = await db.chapter.findUnique({ where: { id } })
			if (!chapter) {
				throw new NotFoundError('Capítulo não encontrado!')
			}

			const page = storage.getFile(
				`mangas/${chapter.mangaId}/chapters/${id}/${number}.avif`,
			)
			const pageExists = await page.exists()
			if (!pageExists) {
				throw new NotFoundError('Página do capítulo não encontrada!')
			}

			await page.delete()

			return { success: true }
		},
		{
			privateRoute: true,
			beforeHandle: ({ auth: { currentUser, authorization } }) => {
				authorization(currentUser, 'delete_pages', 'Chapter')
			},
		},
	)
