import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { LoadMountSecrets } from './config/load'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(process.env.PORT ?? 4000)
  LoadMountSecrets()
  Logger.debug(`API Gateway running on port ${process.env.PORT ?? 4000}`)
}
bootstrap()
