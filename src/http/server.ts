import Elysia from 'elysia'
import auth from '@/modules/auth'
import authors from '@/modules/authors'
import chapters from '@/modules/chapters'
import mangas from '@/modules/mangas'
import readingHistory from '@/modules/reading-history'
import tags from '@/modules/tags'
import users from '@/modules/users'

const app = new Elysia({ aot: true, normalize: 'typebox' })
	.use(users)
	.use(mangas)
	.use(authors)
	.use(tags)
	.use(chapters)
	.use(auth)
	.use(readingHistory)
	.listen({ port: 3333, hostname: '0.0.0.0' })

console.log(`DK Mangas API is running at ${app.server?.url}`)
