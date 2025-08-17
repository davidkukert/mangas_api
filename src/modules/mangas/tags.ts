import { Prisma } from '@db/prisma/client'
import Elysia from 'elysia'
import { setup } from '@/setup'
import { MangaModel } from './model'

export default new Elysia({ name: 'manga-tags-manager', prefix: '/:id/tags' })
	.use(MangaModel)
	.use(setup)
	.post(
		'/:tagId',
		async ({ HttpError, db, params: { id, tagId } }) => {
			const tag = await db.tag.findUniqueOrThrow({
				where: { id: tagId },
				include: { mangas: true },
			})

			if (tag.mangas.some((manga) => manga.id === id)) {
				throw HttpError.Conflict('Tag já adicionada ao manga')
			}

			await db.manga.update({
				where: { id },
				data: {
					tags: {
						connect: { id: tagId },
					},
				},
			})

			return { message: 'Tag adicionada ao manga' }
		},
		{
			privateRoute: true,
			beforeHandle({ auth }) {
				auth.authorization(auth.currentUser, 'add_tag', 'Manga')
			},
		},
	)
	.delete(
		'/:tagId',
		async ({ HttpError, db, params: { id, tagId } }) => {
			const tag = await db.tag.findUniqueOrThrow({
				where: { id: tagId },
				include: { mangas: true },
			})

			if (!tag.mangas.some((manga) => manga.id === id)) {
				throw HttpError.BadRequest('Tag não está associada a este manga!')
			}

			await db.manga.update({
				where: { id, tags: { some: { id: tagId } } },
				data: {
					tags: {
						disconnect: { id: tagId },
					},
				},
			})

			return { message: 'Tag removida do manga' }
		},
		{
			privateRoute: true,
			beforeHandle({ auth }) {
				auth.authorization(auth.currentUser, 'remove_tag', 'Manga')
			},
		},
	)
	.get(
		'/',
		async ({ db, params: { id } }) => {
			const data = await db.tag.findMany({
				where: { mangas: { some: { id } } },
			})
			return { data }
		},
		{
			publicRoute: true,
		},
	)
	.onError(({ error, handleError, set }) => {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			const { message, status } = handleError(error, 'Manga')
			set.status = status
			return { message }
		}
	})
