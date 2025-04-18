import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class AppService {
  constructor(private readonly amqpConnection: AmqpConnection) {}
  async getHello() {
    Logger.debug('Message send')
    await this.amqpConnection.publish(
      'user-exchange',
      'user.created',
      {
        message: 'Desde api-gateway',
      },
      {
        expiration: 5000,
      },
    )
    return {
      message: 'ok',
    }
  }
  async create(data: { email: string; name: string; description: string }) {
    Logger.debug('Message send')
    return await this.amqpConnection.publish(
      'user-exchange',
      'user.created',
      {
        message: 'Desde api-gateway',
        data,
      },
      {
        expiration: 5000,
      },
    )
  }
}
