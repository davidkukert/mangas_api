import { setup } from '@app/setup'
import { Prisma } from '@db/prisma/client'
import Elysia from 'elysia'
import { MangaModel } from './model'

export const mangasAuthors = new Elysia({ prefix: '/:id/authors' })
	.use(MangaModel)
	.use(setup)
	.put(
		'/:authorId',
		async ({ db, query: { role }, params: { id, authorId } }) => {
			await db.mangaAuthor.create({
				data: {
					mangaId: id,
					authorId,
					role,
				},
			})

			return { message: 'Author added to manga' }
		},
		{
			query: 'manga.author.add',
			privateRoute: true,
			beforeHandle: async ({ auth: { authorization, currentUser } }) => {
				return authorization(currentUser, 'add_author', 'Manga')
			},
		},
	)
	.delete(
		'/:authorId',
		async ({ db, params: { id, authorId } }) => {
			await db.mangaAuthor.delete({
				where: {
					mangaId_authorId: {
						mangaId: id,
						authorId,
					},
				},
			})
			return { message: 'Author removed from manga' }
		},
		{
			privateRoute: true,
			beforeHandle: async ({ auth: { authorization, currentUser } }) => {
				return authorization(currentUser, 'remove_author', 'Manga')
			},
		},
	)
	.get('/', async ({ db, params: { id } }) => {
		const data = await db.author.findMany({
			where: { mangas: { some: { mangaId: id } } },
		})
		return { data }
	})
	.onError(({ error, handleError, set }) => {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			let modelName: Prisma.ModelName = 'MangaAuthor'
			if (error.message.includes('manga_id')) {
				modelName = 'Manga'
			} else if (error.message.includes('author_id')) {
				modelName = 'Author'
			}

			const { message, status } = handleError(error, 'Manga', {
				P2002: 'Author already added to manga',
				P2003: `${modelName} not found`,
				P2025: 'Author not added to manga',
			})
			set.status = status
			return { message }
		}
	})
