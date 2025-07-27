import { setup } from '@app/setup'
import { Prisma } from '@db/prisma/client'
import Elysia from 'elysia'
import { MangaModel } from './model'

export const mangaFollows = new Elysia({ prefix: '/:id/follows' })
	.use(MangaModel)
	.use(setup)
	.put(
		'/:followerId',
		async ({ db, query: { status }, params: { id, followerId } }) => {
			await db.mangaFollower.create({
				data: {
					mangaId: id,
					followerId,
					status,
				},
			})

			return { message: 'Manga followed' }
		},
		{
			query: 'manga.follow.atts',
			privateRoute: true,
			beforeHandle: async ({ auth: { authorization, currentUser } }) => {
				return authorization(currentUser, 'follow', 'Manga')
			},
		},
	)
	.delete(
		'/:followerId',
		async ({ db, params: { id, followerId } }) => {
			await db.mangaFollower.delete({
				where: {
					mangaId_followerId: {
						mangaId: id,
						followerId,
					},
				},
			})

			return { message: 'Manga unfollowed' }
		},
		{
			privateRoute: true,
			beforeHandle: async ({ auth: { authorization, currentUser } }) => {
				return authorization(currentUser, 'unfollow', 'Manga')
			},
		},
	)
	.onError(({ error, handleError, set }) => {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			let modelName: Prisma.ModelName = 'MangaFollower'
			if (error.message.includes('manga_id')) {
				modelName = 'Manga'
			} else if (error.message.includes('follower_id')) {
				modelName = 'User'
			}

			const { message, status } = handleError(error, 'Manga', {
				P2002: 'You already follow this manga',
				P2003: `${modelName} not found`,
				P2025: 'You are not following this manga',
			})
			set.status = status
			return { message }
		}
	})
