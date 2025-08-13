import Elysia from 'elysia'
import authors from '@/modules/authors'
import mangas from '@/modules/mangas'
import tags from '@/modules/tags'
import users from '@/modules/users'

const app = new Elysia({ aot: true, normalize: 'typebox' })
	.use(users)
	.use(mangas)
	.use(authors)
	.use(tags)
	.listen({ port: 3333, hostname: '0.0.0.0' })

console.log(`DK Mangas API is running at ${app.server?.url}`)
