import Elysia, { t } from 'elysia'

export const ReadingHistoryModel = new Elysia({
	name: 'Model.ReadingHistory',
}).model({
	ReadingHistoryQueryRoute: t.Object({
		page: t.Optional(t.Number({ minimum: 0 })),
	}),
})
