import * as fs from 'fs'
import { join } from 'path'

const secretsPath = '/mnt/secrets-store'

const injectSecretToEnv = (filename: string, envVar: string) => {
  const fullPath = join(secretsPath, filename)
  if (fs.existsSync(fullPath)) {
    process.env[envVar] = fs.readFileSync(fullPath, 'utf8').trim()
  }
}

injectSecretToEnv('db-username', 'DB_USERNAME')
injectSecretToEnv('db-password', 'DB_PASSWORD')
injectSecretToEnv('rabbit_uri', 'RABBITMQ_URL')
