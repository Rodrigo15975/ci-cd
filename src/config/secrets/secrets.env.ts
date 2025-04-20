import * as fs from 'fs'
import { join } from 'path'
import * as dotenv from 'dotenv'
dotenv.config()
export const secretsPath = '/mnt/secrets-store'

export type SecretKey =
  | 'db_username'
  | 'db_password'
  | 'rabbit_uri'
  | 'jwt_secret'

export const readSecret = (key: SecretKey): string | null => {
  const fullPath = join(secretsPath, key)
  return fs.existsSync(fullPath)
    ? fs.readFileSync(fullPath, 'utf8').trim()
    : null
}

export const secrets: Record<SecretKey, string> = {
  db_username:
    readSecret('db_username') ?? process.env.DB_USERNAME ?? 'default_user',
  db_password:
    readSecret('db_password') ?? process.env.DB_PASSWORD ?? 'default_pass',
  rabbit_uri:
    readSecret('rabbit_uri') ??
    process.env.RABBITMQ_URL ??
    'amqp://localhost:5672',
  jwt_secret:
    readSecret('jwt_secret') ?? process.env.JWT_SECRET ?? 'default_secret',
}
