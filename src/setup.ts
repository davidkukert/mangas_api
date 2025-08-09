import { prismaDecorator } from '@db'
import { AuthService } from '@modules/auth/service'
import { storageDecorator } from '@utils/storage'
import Elysia from 'elysia'

export const setup = new Elysia({ name: 'Setup.APP' })
	.use(storageDecorator)
	.use(prismaDecorator)
	.use(AuthService)
