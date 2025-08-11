import Elysia from 'elysia'
import { dbDecorator } from './db'

export const setup = new Elysia({ name: 'setup-api' }).use(dbDecorator)
