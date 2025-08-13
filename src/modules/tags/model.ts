import Elysia from 'elysia'
import {
	TagCreatePlainInputSchema,
	TagListResponseSchema,
	TagPlain,
	TagResponseSchema,
	TagUpdatePlainInputSchema,
} from './schemas'

export const TagModel = new Elysia({ name: 'tag-model' }).model({
	TagCreatePlainInput: TagCreatePlainInputSchema,
	TagUpdatePlainInput: TagUpdatePlainInputSchema,
	Tag: TagPlain,
	TagResponse: TagResponseSchema,
	TagListResponse: TagListResponseSchema,
})
