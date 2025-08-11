import Elysia from 'elysia'
import {
	UserCreatePlainInputSchema,
	UserListResponseSchema,
	UserPlain,
	UserResponseSchema,
	UserUpdatePlainInputSchema,
} from './schemas'

export const UserModel = new Elysia({ name: 'user-model' }).model({
	UserCreateInput: UserCreatePlainInputSchema,
	UserUpdateInput: UserUpdatePlainInputSchema,
	User: UserPlain,
	UserResponse: UserResponseSchema,
	UserListResponse: UserListResponseSchema,
})
