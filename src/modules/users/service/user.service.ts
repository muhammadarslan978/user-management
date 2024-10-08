import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { IUser } from '../../schema/user.schema';
import { UserRepository } from '../repository/user.repository';
import {
  IPlainUser,
  SuccessMessage,
  WhereUser,
} from '../interface/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: CreateUserDto): Promise<IUser> {
    const existingUser = await this.userRepository.findOne({
      email: data.email,
    });

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
      const user = await this.userRepository.create(data);
      return user;
    } catch (err) {
      this.handleServiceError('createUser', err);
    }
  }

  async getUser(where: WhereUser): Promise<IUser> {
    try {
      const user = await this.userRepository.findOne(where);

      if (!user) {
        throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (err) {
      this.handleServiceError('getUser', err);
    }
  }

  async getUserById(id: string, populateFields?: string[]): Promise<IUser> {
    try {
      const user = await this.userRepository.findById(id, populateFields);

      if (!user) {
        this.logger.warn(`User not found with ID: ${id}`);
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      delete user.password;

      return user;
    } catch (err) {
      this.handleServiceError('getUserById', err);
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
      }
      const updatedUser = await this.userRepository.updateById(
        id,
        updateUserDto,
      );
      return updatedUser;
    } catch (err) {
      this.handleServiceError('updateUser', err);
    }
  }

  async changePassword(
    id: string,
    newPassword: string,
  ): Promise<SuccessMessage> {
    try {
      const data = { password: newPassword };
      await this.userRepository.updateById(id, data);
      return { message: 'Password changed successfullyu' };
    } catch (err) {
      this.handleServiceError('changePassword', err);
    }
  }

  async addWorkoutsToUser(
    userId: string,
    workoutIds: string[],
  ): Promise<IUser> {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      user.selected_workouts = Array.from(
        new Set([...(user.selected_workouts || []), ...workoutIds]),
      );

      return this.userRepository.updateById(userId, user);
    } catch (err) {
      this.handleServiceError('addWorkoutsToUser', err);
    }
  }

  transformToPlainUser(user: IUser): IPlainUser {
    return {
      _id: user._id.toString(),
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      roles: user.roles,
      fitness_goals: user.fitness_goals,
      preferences: user.preferences,
      selected_workouts: user.selected_workouts,
    };
  }

  private handleServiceError(method: string, err: any): never {
    this.logger.error(`Error in ${method}:`, err.stack || err);

    if (err instanceof HttpException) {
      throw err;
    }

    throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
