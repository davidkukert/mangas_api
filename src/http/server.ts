import { envVars } from '@app/env'
import { setup } from '@app/setup'
import { auth } from '@modules/auth'
import { authors } from '@modules/authors'
import { chapters } from '@modules/chapters'
import { mangas } from '@modules/mangas'
import { readingHistory } from '@modules/reading-history'
import { tags } from '@modules/tags'
import { uploads } from '@modules/uploads'
import { users } from '@modules/users'
import Elysia from 'elysia'

const app = new Elysia({
	aot: true,
	normalize: 'typebox',
})
	.use(setup)
	.use(users)
	.use(auth)
	.use(mangas)
	.use(authors)
	.use(tags)
	.use(chapters)
	.use(uploads)
	.use(readingHistory)
	.listen({ port: envVars.PORT, hostname: '0.0.0.0' })

console.log(`API is running at ${app.server?.url}`)
