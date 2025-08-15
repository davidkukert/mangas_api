import { Prisma } from '@db/prisma/client'
import Elysia from 'elysia'
import { setup } from '@/setup'
import authors from './authors'
import { MangaModel } from './model'
import tags from './tags'

export default new Elysia({ prefix: '/mangas' })
	.use(setup)
	.use(MangaModel)
	.use(authors)
	.use(tags)
	.get(
		'/',
		async ({ db }) => {
			const data = await db.manga.findMany()
			return { data }
		},
		{ response: 'MangaListResponse' },
	)
	.get(
		'/:id',
		async ({ db, params: { id } }) => {
			const data = await db.manga.findUniqueOrThrow({ where: { id } })
			return { data }
		},
		{
			response: 'MangaResponse',
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
		},
	)
	.delete('/:id', async ({ db, params: { id } }) => {
		await db.manga.delete({ where: { id } })
		return { message: 'Manga deletado com sucesso!' }
	})
	.onError(({ error, handleError, set }) => {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			const { message, status } = handleError(error, 'Manga')
			set.status = status
			return { message }
		}
	})
