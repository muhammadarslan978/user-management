import { Module } from '@nestjs/common';

import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from '../schema/featureDb';
import { UserRepository } from './service/user.repository';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [MongooseModule.forFeature(forFeatureDb), RolesModule],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [],
})
export class UsersModule {}
