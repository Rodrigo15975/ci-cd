import { Body, Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return {
      message: 'modificado',
      test: 2,
    }
  }

  @Post('/create')
  create(@Body() data: { email: string; name: string; description: string }) {
    return this.appService.create(data)
  }
}
