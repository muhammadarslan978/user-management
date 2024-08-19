import { Module } from '@nestjs/common';

import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from '../schema/featureDb';
import { UserRepository } from './service/user.repository';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/services/auth.service';
import { PasswordService } from '../auth/services/password.service';

@Module({
  imports: [MongooseModule.forFeature(forFeatureDb), AuthModule],
  providers: [UserService, UserRepository, AuthService, PasswordService],
  controllers: [UserController],
  exports: [],
})
export class UsersModule {}
