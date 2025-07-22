import {
	AuthorPlainInputCreate,
	AuthorPlainInputUpdate,
} from '@db/schemas/Author'
import Elysia from 'elysia'

export const AuthorModel = new Elysia({ name: 'Model.Author' }).model({
	'author.create': AuthorPlainInputCreate,
	'author.update': AuthorPlainInputUpdate,
})
