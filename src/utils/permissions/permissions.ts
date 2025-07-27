import type { AbilityBuilder } from '@casl/ability'
import type { AppAbility, UserAbility } from '@utils/permissions'
import type { Role } from '@utils/permissions/roles'

type PermissionsByRole = (
	user: UserAbility,
	builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
	admin(_user, { can, cannot }) {
		can('manage', 'all')
		cannot(['update', 'delete'], 'User', {
			role: {
				$eq: 'admin',
			},
		})
	},
	reader(user, { can }) {
		can('read', 'all')
		can(['follow', 'unfollow'], 'Manga')
		can(['add_reading_history', 'remove_reading_history'], 'Chapter')
		can(['update', 'delete'], 'User', {
			id: {
				$eq: user.id,
			},
		})
	},
	guest(_, { can }) {
		can('read', 'all')
		can('create', 'User')
	},
}
