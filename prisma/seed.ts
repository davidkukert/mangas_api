import { PrismaClient } from '@db/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import generatePassword from 'generate-password'
import { envVars } from '@/env'

const adapter = new PrismaPg({
	connectionString: envVars.DATABASE_URL,
})

const prisma = new PrismaClient({ adapter })

async function main() {
	const existingAdmin = await prisma.user.findFirst({
		where: { OR: [{ email: envVars.ADMIN_EMAIL, role: 'ADMIN' }] },
	})

	if (!existingAdmin) {
		const password = generatePassword.generate({
			length: 12,
			numbers: true,
			symbols: true,
			uppercase: true,
			lowercase: true,
			excludeSimilarCharacters: true,
		})

		await prisma.user.create({
			data: {
				email: envVars.ADMIN_EMAIL,
				username: envVars.ADMIN_USERNAME,
				password: Bun.password.hashSync(password),
				role: 'ADMIN',
			},
		})

		console.log('✅ Usuário administrador criado com sucesso!')
		console.log(`✅ Criado com senha: ${password}`)
	} else {
		console.log('ℹ️ Usuário administrador já existe.')
	}
}

main()
	.catch((e) => {
		console.error('Erro ao executar seed:', e)
		process.exit(1)
	})
	.finally(() => {
		prisma.$disconnect()
	})
