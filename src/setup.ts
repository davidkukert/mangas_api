import Elysia from 'elysia'
import { dbDecorator } from './db'
import errors, { errorsDecorator } from './errors'
import { AuthService } from './modules/auth/service'
import { storageDecorator } from './utils/storage'

export const setup = new Elysia({ name: 'setup-api' })
	.use(dbDecorator)
	.use(AuthService)
	.use(storageDecorator)
	.use(errors)
	.use(errorsDecorator)
