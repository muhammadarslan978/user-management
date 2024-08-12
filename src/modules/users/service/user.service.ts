import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login.dto';
import { IUser } from '../../schema/user.schema';
import { UserRepository } from './user.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ISigninPayload } from '../interface/user.interface';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createUser(data: CreateUserDto): Promise<IUser> {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      this.logger.warn(
        `User registration attempt with existing email: ${data.email}`,
      );
      throw new HttpException(
        'User already exists with this email',
        HttpStatus.CONFLICT,
      );
    }

    try {
      const hashedPassword = await this.hashPassword(data.password);
      data.password = hashedPassword;

      const user = await this.userRepository.createUser(data);
      return user;
    } catch (err) {
      this.handleServiceError('createUser', err);
    }
  }

  async signin(data: LoginUserDto): Promise<any> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      this.logger.warn(`Failed signin attempt with email: ${data.email}`);
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isMatched = await this.comparePassword(data.password, user.password);

    if (!isMatched) {
      this.logger.warn(`Failed password match for email: ${data.email}`);
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    delete user.password;

    const payload: ISigninPayload = {
      _id: user._id.toString(),
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      roles: user.roles,
    };

    return payload;
  }

  private async hashPassword(password: string): Promise<string> {
    const [hashedPassword] = await this.eventEmitter.emitAsync(
      'utils.hashPassword',
      { password },
    );
    return hashedPassword;
  }

  private async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    const [isMatched] = await this.eventEmitter.emitAsync(
      'utils.comparePassword',
      { password, hash },
    );
    return isMatched;
  }

  private handleServiceError(method: string, err: any): never {
    this.logger.error(`Error in ${method}:`, err.stack || err);

    if (err instanceof HttpException) {
      throw err;
    }

    throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
