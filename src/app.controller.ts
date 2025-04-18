import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello()
    return {
      message: 'modificado',
      test: 3,
      status: HttpStatus.OK,
    }
  }

  @Post('/create')
  create(@Body() data: { email: string; name: string; description: string }) {
    return this.appService.create(data)
  }
}
