import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return { createUserDto, message: 'This action adds a new user' }
  }

  findAll() {
    return {
      message: 'all',
    }
  }

  findOne(id: number) {
    return { message: `This action returns a #${id} user` }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return { updateUserDto, message: `This action updates a #${id} user` }
  }

  remove(id: number) {
    return { message: `This action removes a #${id} user` }
  }
}
