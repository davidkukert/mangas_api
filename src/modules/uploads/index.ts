import { setup } from '@app/setup'
import Elysia, { NotFoundError } from 'elysia'
import { UploadModel } from './model'

export const uploads = new Elysia({
	name: 'Module.Uploads',
	prefix: '/uploads',
})
	.use(UploadModel)
	.use(setup)
	.post(
		'/mangas/:id/cover',
		async ({ db, body: { cover }, params: { id }, storage, set }) => {
			const manga = await db.manga.findUnique({ where: { id } })
			if (!manga) {
				throw new NotFoundError('Manga not found')
			}

			await storage.uploadFile(
				cover,
				`mangas/${id}/cover.${cover.type.split('/')[1]}`,
			)

			set.status = 201
			return { success: true }
		},
		{
			body: 'upload.manga.cover',
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
				throw new NotFoundError('Cover not found')
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
				throw new NotFoundError('Cover not found')
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
				throw new NotFoundError('Chapter not found')
			}

			if (pages.some((page) => !/^\d+\.avif$/i.test(page.name))) {
				set.status = 'Bad Request'
				throw new Error(
					'Some page have invalid name, only numbers are allowed in page name',
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
			body: 'upload.chapter.pages',
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
				throw new NotFoundError('Chapter not found')
			}

			const page = storage.getFile(
				`mangas/${chapter.mangaId}/chapters/${id}/${number}.avif`,
			)
			const pageExists = await page.exists()
			if (!pageExists) {
				throw new NotFoundError('Page not found')
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
				throw new NotFoundError('Chapter not found')
			}

			const page = storage.getFile(
				`mangas/${chapter.mangaId}/chapters/${id}/${number}.avif`,
			)
			const pageExists = await page.exists()
			if (!pageExists) {
				throw new NotFoundError('Page not found')
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
