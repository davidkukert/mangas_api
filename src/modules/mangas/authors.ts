import { Prisma } from '@db/prisma/client'
import Elysia from 'elysia'
import { setup } from '@/setup'
import { MangaModel } from './model'

export default new Elysia({
	name: 'manga-authors-manager',
	prefix: '/:id/authors',
})
	.use(setup)
	.use(MangaModel)
	.post(
		'/:authorId',
		async ({ db, params: { id: mangaId, authorId }, query: { role }, set }) => {
			await db.mangaAuthor.create({
				data: {
					mangaId,
					authorId,
					role,
				},
			})

			set.status = 'Created'
			return { message: 'Autor adicionado com sucesso ao manga!' }
		},
		{
			query: 'MangaAuthorQueryRoute',
			privateRoute: true,
			beforeHandle({ auth }) {
				auth.authorization(auth.currentUser, 'add_author', 'Manga')
			},
		},
	)
	.delete(
		'/:authorId',
		async ({ db, params: { id: mangaId, authorId } }) => {
			await db.mangaAuthor.delete({
				where: { mangaId_authorId: { authorId, mangaId } },
			})
			return { message: 'Autor removido com sucesso do manga!' }
		},
		{
			privateRoute: true,
			beforeHandle({ auth }) {
				auth.authorization(auth.currentUser, 'remove_author', 'Manga')
			},
		},
	)
	.onError(({ error, handleError, set }) => {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			let modelName = 'MangaAuthor'
			if (error.message.includes('manga_id')) {
				modelName = 'Manga'
			} else if (error.message.includes('author_id')) {
				modelName = 'Autor'
			}

			const { message, status } = handleError(error, 'Manga', {
				P2002: 'Autor ja relacionado a este manga!',
				P2003: `${modelName} não encontrado`,
				P2025: 'Autor não adicionado ao manga',
			})

			set.status = status
			return { message }
		}
	})
