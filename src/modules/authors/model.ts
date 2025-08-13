import Elysia from 'elysia'
import {
	AuthorCreatePlainInputSchema,
	AuthorListResponseSchema,
	AuthorPlain,
	AuthorResponseSchema,
	AuthorUpdatePlainInputSchema,
} from './schemas'

export const AuthorModel = new Elysia({ name: 'author-model' }).model({
	AuthorCreatePlainInput: AuthorCreatePlainInputSchema,
	AuthorUpdatePlainInput: AuthorUpdatePlainInputSchema,
	Author: AuthorPlain,
	AuthorResponse: AuthorResponseSchema,
	AuthorListResponse: AuthorListResponseSchema,
})
