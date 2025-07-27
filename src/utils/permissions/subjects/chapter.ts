import { z } from 'zod'

export const chapterSubject = z.tuple([
	z.union([
		z.literal('create'),
		z.literal('read'),
		z.literal('update'),
		z.literal('delete'),
		z.literal('upload_pages'),
		z.literal('delete_pages'),
		z.literal('add_reading_history'),
		z.literal('remove_reading_history'),
		z.literal('manage'),
	]),
	z.union([z.literal('Chapter')]),
])

export type ChapterSubject = z.infer<typeof chapterSubject>
