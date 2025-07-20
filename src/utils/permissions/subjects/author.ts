import { z } from 'zod'

export const authorSubject = z.tuple([
	z.union([
		z.literal('create'),
		z.literal('read'),
		z.literal('update'),
		z.literal('delete'),
		z.literal('manage'),
	]),
	z.union([z.literal('Author')]),
])

export type AuthorSubject = z.infer<typeof authorSubject>
