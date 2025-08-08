import { TagPlainInputCreate, TagPlainInputUpdate } from '@modules/tags/schemas'
import Elysia from 'elysia'

export const TagModel = new Elysia({ name: 'Model.Tag' }).model({
	'tag.create': TagPlainInputCreate,
	'tag.update': TagPlainInputUpdate,
})
