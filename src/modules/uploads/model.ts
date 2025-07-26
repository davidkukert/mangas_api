import Elysia, { t } from 'elysia'

export const UploadModel = new Elysia({ name: 'Model.Upload' }).model({
	'upload.manga.cover': t.Object({
		cover: t.File({
			type: ['image/avif'],
		}),
	}),
	'upload.chapter.pages': t.Object({
		pages: t.Files({
			type: ['image/avif'],
		}),
	}),
})
