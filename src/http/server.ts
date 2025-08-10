import Elysia from 'elysia'

const app = new Elysia().listen({ port: 3333, hostname: '0.0.0.0' })

console.log(`DK Mangas API is running at ${app.server?.url}`)
