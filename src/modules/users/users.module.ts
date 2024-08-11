import { Module } from '@nestjs/common';

import { UserService } from './service/user/user.service';
import { UserController } from './controller/user.controller';
import { RoleService } from './service/role/role.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilsService } from './service/utils/utils.service';
import forFeatureDb from './schems/feature.db';

@Module({
  imports: [MongooseModule.forFeature(forFeatureDb)],
  providers: [UserService, RoleService, UtilsService],
  controllers: [UserController],
  exports: [RoleService],
})
export class UsersModule {}
