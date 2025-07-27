import {
	AuthorPlainInputCreate,
	AuthorPlainInputUpdate,
} from '@db/schemas/Author'
import Elysia, { t } from 'elysia'

export const AuthorModel = new Elysia({ name: 'Model.Author' }).model({
	'author.create': t.Composite([
		AuthorPlainInputCreate,
		t.Object({ userId: t.Optional(t.String()) }),
	]),
	'author.update': t.Composite([
		AuthorPlainInputUpdate,
		t.Object({ userId: t.Optional(t.String()) }),
	]),
})
