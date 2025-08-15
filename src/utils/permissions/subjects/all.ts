import { z } from 'zod'

export const allSubject = z.tuple([
	z.union([
		z.literal('create'),
		z.literal('read'),
		z.literal('update'),
		z.literal('delete'),
		z.literal('manage'),
	]),
	z.literal('all'),
])

export type AllSubject = z.infer<typeof allSubject>
