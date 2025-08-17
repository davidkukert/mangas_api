import { Prisma } from '@db/prisma/client'
import Elysia from 'elysia'
import { setup } from '@/setup'
import { MangaModel } from './model'

export default new Elysia({
	name: 'manga-follow-manager',
	prefix: '/:id/follows',
})
	.use(setup)
	.use(MangaModel)
	.post(
		'/',
		async ({ auth, db, query: { status }, params: { id } }) => {
			await db.mangaFollower.create({
				data: {
					mangaId: id,
					followerId: auth.currentUser.id,
					status,
				},
			})

			return { message: 'Manga seguido com sucesso!' }
		},
		{
			query: 'MangaFollowQueryRoute',
			privateRoute: true,
		},
	)
	.delete(
		'/',
		async ({ auth, db, params: { id } }) => {
			await db.mangaFollower.delete({
				where: {
					mangaId_followerId: {
						mangaId: id,
						followerId: auth.currentUser.id,
					},
				},
			})

			return { message: 'Manga desseguido com sucesso!' }
		},
		{
			privateRoute: true,
		},
	)
	.get('/', async ({ db, params: { id } }) => {
		const data = await db.user.findMany({
			where: { followingMangas: { some: { mangaId: id } } },
		})
		return { data }
	})
	.onError(({ error, handleError, set }) => {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			let modelName = 'MangaFollower'
			if (error.message.includes('manga_id')) {
				modelName = 'Manga'
			} else if (error.message.includes('follower_id')) {
				modelName = 'Usuário'
			}

			const { message, status } = handleError(error, 'Manga', {
				P2002: 'Você já segue este manga!',
				P2003: `${modelName} não encontrado`,
				P2025: 'Você não está seguindo este manga',
			})
			set.status = status
			return { message }
		}
	})
