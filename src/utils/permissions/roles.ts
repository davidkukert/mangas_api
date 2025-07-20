import { Role as RoleEnum } from '@db/prisma/enums'
import z from 'zod'

export const role = z.union([
	z.enum(RoleEnum),
	z.literal('guest').default('guest'),
])

export type Role = z.infer<typeof role>
