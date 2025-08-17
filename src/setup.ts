import Elysia from 'elysia'
import { dbDecorator } from './db'
import { AuthService } from './modules/auth/service'

export const setup = new Elysia({ name: 'setup-api' })
	.use(dbDecorator)
	.use(AuthService)
