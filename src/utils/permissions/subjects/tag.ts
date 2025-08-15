import { z } from 'zod'

export const tagSubject = z.tuple([
	z.union([
		z.literal('create'),
		z.literal('read'),
		z.literal('update'),
		z.literal('delete'),
		z.literal('manage'),
	]),
	z.union([z.literal('Tag')]),
])

export type TagSubject = z.infer<typeof tagSubject>
