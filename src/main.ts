import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import * as fs from 'fs'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(process.env.PORT ?? 4000)
  // Leer secretos montados por el CSI Driver
  const secretsPath = '/mnt/secrets-store'
  const dbUser = fs.readFileSync(join(secretsPath, 'db-user'), 'utf8')
  const dbPassword = fs.readFileSync(join(secretsPath, 'db-password'), 'utf8')

  Logger.verbose(`Database User: ${dbUser}`) // Imprime: admin
  Logger.verbose(`Database Password: ${dbPassword}`) // Imprime: securepassword123

  Logger.debug(`API Gateway running on port ${process.env.PORT ?? 4000}`)
}
bootstrap()
