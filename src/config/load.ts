import { Logger } from '@nestjs/common'
import * as fs from 'fs'
import { join } from 'path'

type SecretKey = 'db-username' | 'db-password' | 'rabbit_uri' | 'jwt_secret'

const secretsPath = '/mnt/secrets-store'

const readSecret = (key: SecretKey): string | null => {
  const fullPath = join(secretsPath, key)
  return fs.existsSync(fullPath)
    ? fs.readFileSync(fullPath, 'utf8').trim()
    : null
}
export const LoadMountSecrets = () => {
  const secrets: Record<SecretKey, string> = {
    'db-username':
      readSecret('db-username') ?? process.env.DB_USERNAME ?? 'default_user',
    'db-password':
      readSecret('db-password') ?? process.env.DB_PASSWORD ?? 'default_pass',
    rabbit_uri:
      readSecret('rabbit_uri') ??
      process.env.RABBITMQ_URL ??
      'amqp://localhost:5672',
    jwt_secret:
      readSecret('jwt_secret') ?? process.env.JWT_SECRET ?? 'default_secret',
  }

  if (
    !readSecret('db-username') ||
    !readSecret('db-password') ||
    !readSecret('rabbit_uri') ||
    !readSecret('jwt_secret')
  )
    Logger.warn(
      'No se encontraron algunos secretos, usando variables de entorno por defecto.',
    )

  Logger.verbose({ secrets })
}

const injectSecretToEnv = (filename: string, envVar: string) => {
  const fullPath = join(secretsPath, filename)
  if (fs.existsSync(fullPath)) {
    process.env[envVar] = fs.readFileSync(fullPath, 'utf8').trim()
  }
}

injectSecretToEnv('db-username', 'DB_USERNAME')
injectSecretToEnv('db-password', 'DB_PASSWORD')
injectSecretToEnv('rabbit_uri', 'RABBITMQ_URL')
