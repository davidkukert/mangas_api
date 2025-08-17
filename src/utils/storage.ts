import { S3Client } from 'bun'
import Elysia from 'elysia'
import { envVars } from '@/env'

export class Storage {
	private client = new S3Client({
		accessKeyId: envVars.ACCESS_KEY_ID,
		secretAccessKey: envVars.SECRET_ACCESS_KEY,
		bucket: envVars.BUCKET_NAME,
		endpoint: envVars.ENDPOINT_URL,
	})

	public async uploadFile(file: File, fileName: string) {
		const response = new Response(file, {
			headers: { 'Content-Type': file.type },
		})
		await this.client.write(fileName, response)
	}

	public getFile(fileName: string) {
		return this.client.file(fileName)
	}

	public async deleteFile(fileName: string) {
		await this.client.delete(fileName)
	}

	public async deleteDirectory(prefix: string) {
		const objsList = await this.client.list({ prefix })

		// biome-ignore lint/suspicious/noDoubleEquals: explanation
		if (objsList.contents != undefined) {
			for (const obj of objsList.contents) {
				await this.client.delete(obj.key)
			}
		}
	}
}

export const storageDecorator = new Elysia({
	name: 'Decorator.Storage',
}).decorate({
	storage: new Storage(),
})
