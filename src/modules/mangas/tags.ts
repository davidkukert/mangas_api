import { setup } from '@app/setup'
import { Prisma } from '@db/prisma/client'
import Elysia from 'elysia'
import { MangaModel } from './model'

export const mangasTags = new Elysia({ prefix: '/:id/tags' })
	.use(MangaModel)
	.use(setup)
	.put(
		'/:tagId',
		async ({ db, params: { id, tagId }, set }) => {
			const tag = await db.tag.findUniqueOrThrow({
				where: { id: tagId },
				include: { mangas: true },
			})

			if (tag.mangas.some((manga) => manga.id === id)) {
				set.status = 409
				throw new Error('Tag already added to manga')
			}

			await db.manga.update({
				where: { id },
				data: {
					tags: {
						connect: { id: tagId },
					},
				},
			})

			return { message: 'Tag added to manga' }
		},
		{
			privateRoute: true,
			beforeHandle: async ({ auth: { authorization, currentUser } }) => {
				return authorization(currentUser, 'add_tag', 'Manga')
			},
		},
	)
	.delete(
		'/:tagId',
		async ({ db, params: { id, tagId }, set }) => {
			const tag = await db.tag.findUniqueOrThrow({
				where: { id: tagId },
				include: { mangas: true },
			})

			if (!tag.mangas.some((manga) => manga.id === id)) {
				set.status = 400
				throw new Error('Tag already removed to manga')
			}

			await db.manga.update({
				where: { id, tags: { some: { id: tagId } } },
				data: {
					tags: {
						disconnect: { id: tagId },
					},
				},
			})

			return { message: 'Tag removed from manga' }
		},
		{
			privateRoute: true,
			beforeHandle: async ({ auth: { authorization, currentUser } }) => {
				return authorization(currentUser, 'remove_tag', 'Manga')
			},
		},
	)
	.onError(({ error, handleError, set }) => {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			const { message, status } = handleError(error, 'Manga', {})
			set.status = status
			return { message }
		}

		if (error instanceof Error) {
			return { message: error.message }
		}
	})
