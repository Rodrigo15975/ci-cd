import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { LoadSecrets } from './config/load'
import './config/load'
LoadSecrets()
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const logger = new Logger('Bootstrap')
  app.useLogger(
    process.env.NODE_ENV === 'development'
      ? ['debug', 'log', 'error', 'warn', 'verbose']
      : ['error', 'warn', 'log'],
  )

  await app.listen(4000, () => {
    if (process.env.NODE_ENV === 'development')
      return logger.debug(
        `Development on port 4000 MODE: ${process.env.NODE_ENV}`,
      )
    logger.log(`Production on port 4000 MODE: ${process.env.NODE_ENV}`)
  })
}
void bootstrap()
