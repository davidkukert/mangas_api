import Elysia, { t } from 'elysia'

export const UploadModel = new Elysia({ name: 'Model.Upload' }).model({
	UploadMangaCover: t.Object({
		cover: t.File({
			type: ['image/avif'],
		}),
	}),
	UploadChapterPages: t.Object({
		pages: t.Files({
			type: ['image/avif'],
		}),
	}),
})
