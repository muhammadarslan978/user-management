import { Module } from '@nestjs/common';

import { UserService } from './service/user/service';
import { UserController } from './controller/user.controller';
import { RoleService } from './service/role/service';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilsService } from './service/utils/utils.service';
import forFeatureDb from './schems/feature.db';
import { UserRepository } from './service/user/repo';
import { RoleRepository } from './service/role/repo';

@Module({
  imports: [MongooseModule.forFeature(forFeatureDb)],
  providers: [
    UserService,
    RoleService,
    UtilsService,
    UserRepository,
    RoleRepository,
  ],
  controllers: [UserController],
  exports: [RoleService],
})
export class UsersModule {}
