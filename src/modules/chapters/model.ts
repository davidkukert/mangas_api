import {
	ChapterPlainInputCreate,
	ChapterPlainInputUpdate,
} from '@db/schemas/Chapter'
import Elysia, { t } from 'elysia'

const ChapterPlainExtraCreate = t.Object(
	{
		mangaId: t.String(),
	},
	{ additionalProperties: false },
)

const ChapterBaseInputCreate = t.Composite([
	ChapterPlainInputCreate,
	ChapterPlainExtraCreate,
])

const ChapterBaseInputUpdate = t.Composite([
	ChapterPlainInputUpdate,
	t.Partial(ChapterPlainExtraCreate),
])

export const ChapterModel = new Elysia({ name: 'Model.Chapter' }).model({
	'chapter.create': ChapterBaseInputCreate,
	'chapter.update': ChapterBaseInputUpdate,
})
