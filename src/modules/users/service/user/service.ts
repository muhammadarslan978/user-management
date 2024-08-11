import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { LoginUserDto } from '../../dto/login.dto';
import { IUser } from '../../schems/user';
import { UserRepository } from './repo';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private eventEmitter: EventEmitter2,
  ) {}

  async createUser(data: CreateUserDto): Promise<IUser> {
    try {
      let user = await this.userRepository.findByEmail(data.email);

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
      user = await this.userRepository.createUser(data);

      return user;
    } catch (err) {
      console.error('Error in createUser:', err);

      if (err instanceof HttpException) {
        throw err;
      }

      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async signin(data: LoginUserDto): Promise<IUser> {
    try {
      const user = await this.userRepository.findByEmail(data.email);

      if (!user) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const [isMatched] = await this.eventEmitter.emitAsync(
        'utils.comparePassword',
        {
          password: data.password,
          hash: user.password,
        },
      );

      if (!isMatched) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      delete user.password;

      return user;
    } catch (err) {
      console.error('Error in signin:', err);

      if (err instanceof HttpException) {
        throw err;
      }

      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
