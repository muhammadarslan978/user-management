import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRole } from '../../schems/role';

@Injectable()
export class RoleRepository {
  constructor(@InjectModel('RoleModel') private roleModel: Model<IRole>) {}

  async findRoleByName(roleName: string): Promise<IRole> {
    return this.roleModel.findOne({ role_name: roleName });
  }

  async createRole(roleData: Partial<IRole>): Promise<IRole> {
    const role = new this.roleModel(roleData);
    return role.save();
  }

  async findAllRoles(): Promise<IRole[]> {
    return this.roleModel.find().exec();
  }
}
