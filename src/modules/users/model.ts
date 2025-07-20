import { UserPlainInputCreate, UserPlainInputUpdate } from '@db/schemas/User'
import Elysia from 'elysia'

export const UserModel = new Elysia({ name: 'Model.User' }).model({
	'user.create': UserPlainInputCreate,
	'user.update': UserPlainInputUpdate,
})
