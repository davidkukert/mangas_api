import { prismaDecorator } from '@db'
import { storageDecorator } from '@utils/storage'
import Elysia from 'elysia'

export const setup = new Elysia({ name: 'Setup.APP' })
	.use(storageDecorator)
	.use(prismaDecorator)
