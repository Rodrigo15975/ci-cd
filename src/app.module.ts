import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
@Module({
  imports: [
    RabbitMQModule.forRoot({
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
      uri: 'amqps://zdktidoi:ZV6BpAaqMPbJ2VBqISAgT8uT-rtrWZph@jaragua.lmq.cloudamqp.com/zdktidoi',
      connectionInitOptions: {
        wait: true,
        timeout: 5000,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
