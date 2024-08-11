import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../../schems/user';
import { CreateUserDto } from '../../dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('UserModel') private userModel: Model<IUser>) {}

  async findByEmail(email: string): Promise<IUser> {
    return this.userModel.findOne({ email }).lean();
  }

  async createUser(data: CreateUserDto): Promise<IUser> {
    return this.userModel.create(data);
  }
}
