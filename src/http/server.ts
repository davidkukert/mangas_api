import { envVars } from '@app/env'
import { setup } from '@app/setup'
import { users } from '@modules/users'
import Elysia from 'elysia'

const app = new Elysia({
	aot: true,
	normalize: 'typebox',
})
	.use(setup)
	.use(users)
	.listen({ port: envVars.PORT, hostname: '0.0.0.0' })

console.log(`API is running at ${app.server?.url}`)
