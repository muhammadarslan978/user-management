import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CreateUserDto } from '../../dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schems/user';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private eventEmitter: EventEmitter2,
  ) {}

  async craeteUser(data: any): Promise<any> {
    try {
      const hashPassword = await this.eventEmitter.emitAsync(
        'utils.hashPassword',
        {
          password: 'user123',
        },
      );
      return hashPassword;
    } catch (err) {
      throw new Error(err);
    }
  }
}
