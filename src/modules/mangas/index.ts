import { Prisma } from '@db/prisma/client'
import Elysia from 'elysia'
import { setup } from '@/setup'
import authors from './authors'
import follows from './follows'
import { MangaModel } from './model'
import tags from './tags'

export default new Elysia({ prefix: '/mangas' })
	.use(setup)
	.use(MangaModel)
	.use(authors)
	.use(tags)
	.use(follows)
	.get(
		'/',
		async ({ db }) => {
			const data = await db.manga.findMany()
			return { data }
		},
		{ response: 'MangaListResponse', publicRoute: true },
	)
	.get(
		'/:id',
		async ({ db, params: { id } }) => {
			const data = await db.manga.findUniqueOrThrow({ where: { id } })
			return { data }
		},
		{
			response: 'MangaResponse',
			publicRoute: true,
		},
	)
	.post(
		'/',
		async ({ db, body, set }) => {
			const data = await db.manga.create({ data: body })
			set.status = 'Created'
			return { data }
		},
		{
			body: 'MangaCreatePlainInput',
			response: 'MangaResponse',
			privateRoute: true,
			beforeHandle({ auth }) {
				auth.authorization(auth.currentUser, 'create', 'Manga')
			},
		},
	)
	.put(
		'/:id',
		async ({ db, body, params: { id } }) => {
			const data = await db.manga.update({ where: { id }, data: body })
			return { data }
		},
		{
			body: 'MangaUpdatePlainInput',
			response: 'MangaResponse',
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
			return { message: 'Manga deletado com sucesso!' }
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
			const { message, status } = handleError(error, 'Manga')
			set.status = status
			return { message }
		}
	})
