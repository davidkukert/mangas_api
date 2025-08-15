import { Prisma } from '@db/prisma/client'
import Elysia from 'elysia'
import { setup } from '@/setup'
import { MangaModel } from './model'

export default new Elysia({ name: 'manga-tags-manager', prefix: '/:id/tags' })
	.use(MangaModel)
	.use(setup)
	.post('/:tagId', async ({ db, params: { id, tagId }, set }) => {
		const tag = await db.tag.findUniqueOrThrow({
			where: { id: tagId },
			include: { mangas: true },
		})

		if (tag.mangas.some((manga) => manga.id === id)) {
			set.status = 409
			throw new Error('Tag já adicionada ao manga')
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
	})
	.delete('/:tagId', async ({ db, params: { id, tagId }, set }) => {
		const tag = await db.tag.findUniqueOrThrow({
			where: { id: tagId },
			include: { mangas: true },
		})

		if (!tag.mangas.some((manga) => manga.id === id)) {
			set.status = 400
			throw new Error('Tag não está associada a este manga!')
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
	})
	.get('/', async ({ db, params: { id } }) => {
		const data = await db.tag.findMany({
			where: { mangas: { some: { id } } },
		})
		return { data }
	})
	.onError(({ error, handleError, set }) => {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			const { message, status } = handleError(error, 'Manga')
			set.status = status
			return { message }
		}

		if (error instanceof Error) {
			return { message: error.message }
		}
	})
