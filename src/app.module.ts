import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserModule } from './module/user/user.module'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RabbitMQModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        exchanges: [
          {
            name: 'user-exchange',
            type: 'direct',
          },
        ],
        queues: [
          {
            name: 'user-queue',
          },
        ],
        uri: configService.getOrThrow<string>('RABBITMQ_URL'),
        connectionInitOptions: {
          wait: true,
          timeout: 5000,
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
