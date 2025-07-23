import { setup } from '@app/setup'
import { Prisma } from '@db/prisma/client'
import Elysia from 'elysia'
import { mangasAuthors } from './authors'
import { MangaModel } from './model'
import { mangasTags } from './tags'

export const mangas = new Elysia({ name: 'Module.Mangas', prefix: '/mangas' })
	.use(MangaModel)
	.use(setup)
	.use(mangasAuthors)
	.use(mangasTags)
	.get(
		'/',
		async ({ db }) => {
			const data = await db.manga.findMany()
			return { data }
		},
		{ publicRoute: true },
	)
	.get(
		'/:id',
		async ({ db, params: { id } }) => {
			const data = await db.manga.findUniqueOrThrow({ where: { id } })
			return { data }
		},
		{ publicRoute: true },
	)
	.post(
		'/',
		async ({ body, db, set }) => {
			const data = await db.manga.create({ data: body })
			set.status = 201
			return { data }
		},
		{
			body: 'manga.create',
			privateRoute: true,
			beforeHandle({ auth }) {
				auth.authorization(auth.currentUser, 'create', 'Manga')
			},
		},
	)
	.put(
		'/:id',
		async ({ body, db, params: { id } }) => {
			const data = await db.manga.update({ where: { id }, data: body })
			return { data }
		},
		{
			body: 'manga.update',
			privateRoute: true,
			beforeHandle({ auth }) {
				auth.authorization(auth.currentUser, 'update', 'Manga')
			},
		},
	)
	.delete(
		'/:id',
		async ({ db, params: { id } }) => {
			await db.manga.delete({ where: { id } })
			return { message: 'Manga deleted' }
		},
		{
			privateRoute: true,
			beforeHandle({ auth }) {
				auth.authorization(auth.currentUser, 'delete', 'Manga')
			},
		},
	)
	.onError(({ error, handleError, set }) => {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			const { message, status } = handleError(error, 'Manga', {})
			set.status = status
			return { message }
		}
	})
