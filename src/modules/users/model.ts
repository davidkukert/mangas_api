import {
	UserPlainInputCreate,
	UserPlainInputUpdate,
} from '@modules/users/schemas'
import Elysia from 'elysia'

export const UserModel = new Elysia({ name: 'Model.User' }).model({
	'user.create': UserPlainInputCreate,
	'user.update': UserPlainInputUpdate,
})
