import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRole } from '../../schems/role';

@Injectable()
export class RoleService {
  constructor(@InjectModel('RoleModel') private roleModel: Model<IRole>) {}

  async findRoleByName(roleName: string): Promise<IRole> {
    try {
      const role = await this.roleModel.findOne({ role_name: roleName });
      if (!role) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: `Role ${roleName} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return role;
    } catch (err) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: err.message || 'An unexpected error occurred',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async assignDefaultRoles(): Promise<void> {
    const roles = ['User', 'Trainer', 'Coach', 'Admin'];
    for (const roleName of roles) {
      const roleExists = await this.roleModel.findOne({ role_name: roleName });
      if (!roleExists) {
        await new this.roleModel({ role_name: roleName }).save();
        console.log(`Seeded role: ${roleName}`);
      }
    }
  }
}
