import { Module } from '@nestjs/common';

import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from '../schema/featureDb';
import { UserRepository } from './service/user.repository';

@Module({
  imports: [MongooseModule.forFeature(forFeatureDb)],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [],
})
export class UsersModule {}
