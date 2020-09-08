import { Inject, Injectable, Optional } from '@nestjs/common'
import { User } from '../../types/user'

@Injectable()
export class UserService {
  getUser (id:string): User | null {
    return {
      email: 'Lucy@123.com',
      password: '123456',
      sex: 0,
      username: 'Lucy'
    }
  }

  getAllUser (): Array<User> {
    return [
      {
        email: 'Lucy@123.com',
        password: '123456',
        sex: 0,
        username: 'Lucy'
      },
      {
        email: 'Lucy@123.com',
        password: '123456',
        sex: 0,
        username: 'Lucy'
      }
    ]
  }
}
