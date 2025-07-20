import { envVars } from '@app/env'
import { setup } from '@app/setup'
import Elysia from 'elysia'

const app = new Elysia({
	aot: true,
	normalize: 'typebox',
})
	.use(setup)
	.listen({ port: envVars.PORT, hostname: '0.0.0.0' })

console.log(`API is running at ${app.server?.url}`)
