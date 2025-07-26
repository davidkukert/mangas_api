import { setup } from '@app/setup'
import Elysia from 'elysia'
import { UploadModel } from './model'

export const uploads = new Elysia({
	name: 'Module.Uploads',
	prefix: '/uploads',
})
	.use(UploadModel)
	.use(setup)
	.post(
		'/mangas/:id/cover',
		async ({
			HttpError,
			db,
			body: { cover },
			params: { id },
			storage,
			set,
		}) => {
			const manga = await db.manga.findUnique({ where: { id } })
			if (!manga) {
				throw HttpError.NotFound('Manga not found')
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
		async ({ HttpError, params: { id }, storage }) => {
			const cover = storage.getFile(`mangas/${id}/cover.avif`)
			const coverExists = await cover.exists()
			if (!coverExists) {
				throw HttpError.NotFound('Cover not found')
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
		async ({ HttpError, params: { id }, storage }) => {
			const cover = storage.getFile(`mangas/${id}/cover.avif`)
			if (!cover.exists()) {
				throw HttpError.NotFound('Cover not found')
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
		async ({
			HttpError,
			body: { pages },
			params: { id },
			db,
			set,
			storage,
		}) => {
			const chapter = await db.chapter.findUnique({ where: { id } })
			if (!chapter) {
				throw HttpError.NotFound('Chapter not found')
			}

			if (pages.some((page) => !/^\d+\.avif$/i.test(page.name))) {
				throw HttpError.BadRequest(
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
		async ({ HttpError, params: { id, number }, db, storage }) => {
			const chapter = await db.chapter.findUnique({ where: { id } })
			if (!chapter) {
				throw HttpError.NotFound('Chapter not found')
			}

			const page = storage.getFile(
				`mangas/${chapter.mangaId}/chapters/${id}/${number}.avif`,
			)
			const pageExists = await page.exists()
			if (!pageExists) {
				throw HttpError.NotFound('Page not found')
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
		async ({ HttpError, params: { id, number }, db, storage }) => {
			const chapter = await db.chapter.findUnique({ where: { id } })
			if (!chapter) {
				throw HttpError.NotFound('Chapter not found')
			}

			const page = storage.getFile(
				`mangas/${chapter.mangaId}/chapters/${id}/${number}.avif`,
			)
			const pageExists = await page.exists()
			if (!pageExists) {
				throw HttpError.NotFound('Page not found')
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
