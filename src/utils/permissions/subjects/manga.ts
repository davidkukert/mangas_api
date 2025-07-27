import { z } from 'zod'

export const mangaSubject = z.tuple([
	z.union([
		z.literal('create'),
		z.literal('read'),
		z.literal('update'),
		z.literal('delete'),
		z.literal('upload_cover'),
		z.literal('delete_cover'),
		z.literal('add_author'),
		z.literal('remove_author'),
		z.literal('add_tag'),
		z.literal('remove_tag'),
		z.literal('follow'),
		z.literal('unfollow'),
		z.literal('manage'),
	]),
	z.union([z.literal('Manga')]),
])

export type MangaSubject = z.infer<typeof mangaSubject>
