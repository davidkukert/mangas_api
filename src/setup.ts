import { prismaDecorator } from '@db'
import { AuthService } from '@modules/auth/service'
import { storageDecorator } from '@utils/storage'
import Elysia from 'elysia'
import { httpError, httpErrorDecorator } from 'elysia-http-error'

export const setup = new Elysia({ name: 'Setup.APP' })
	.use(storageDecorator)
	.use(prismaDecorator)
	.use(httpError())
	.use(httpErrorDecorator)
	.use(AuthService)
