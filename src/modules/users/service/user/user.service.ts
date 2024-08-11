import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CreateUserDto } from '../../dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '../../schems/user';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('UserModel') private userModel: Model<IUser>,
    private eventEmitter: EventEmitter2,
  ) {}

  async createUser(data: CreateUserDto): Promise<IUser> {
    try {
      console.log('Creating user with data:', data);

      let user = await this.userModel.findOne({ email: data.email });
      if (user) {
        throw new HttpException(
          'User already exists with this email',
          HttpStatus.CONFLICT,
        );
      }

      const [hashPassword] = await this.eventEmitter.emitAsync(
        'utils.hashPassword',
        {
          password: data.password,
        },
      );
      data.password = hashPassword;

      user = await this.userModel.create(data);
      console.log('User created:', user);

      return user;
    } catch (err) {
      console.error('Error in createUser:', err);
      throw new HttpException(
        err.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
