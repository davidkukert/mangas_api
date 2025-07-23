import { TagPlainInputCreate, TagPlainInputUpdate } from '@db/schemas/Tag'
import Elysia from 'elysia'

export const TagModel = new Elysia({ name: 'Model.Tag' }).model({
	'tag.create': TagPlainInputCreate,
	'tag.update': TagPlainInputUpdate,
})
