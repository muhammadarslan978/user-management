import { Module } from '@nestjs/common';
import { RoleService } from './service/role.service';
import { RoleRepository } from './service/role.repository';
import { MongooseModule } from '@nestjs/mongoose';
import featureDb from '../schema/featureDb';

@Module({
  imports: [MongooseModule.forFeature(featureDb)],
  providers: [RoleRepository, RoleService],
  exports: [RoleService],
})
export class RolesModule {}
