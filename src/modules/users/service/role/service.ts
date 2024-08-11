import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RoleRepository } from './repo';
import { IRole } from '../../schems/role';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  async findRoleByName(roleName: string): Promise<IRole> {
    try {
      const role = await this.roleRepository.findRoleByName(roleName);
      if (!role) {
        throw new HttpException(
          `Role ${roleName} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return role;
    } catch (err) {
      console.error('Error in findRoleByName:', err);

      if (err instanceof HttpException) {
        throw err;
      }

      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async assignDefaultRoles(): Promise<void> {
    try {
      const roles = ['User', 'Trainer', 'Coach', 'Admin'];
      for (const roleName of roles) {
        const roleExists = await this.roleRepository.findRoleByName(roleName);
        if (!roleExists) {
          await this.roleRepository.createRole({ role_name: roleName });
          console.log(`Seeded role: ${roleName}`);
        }
      }
    } catch (err) {
      console.error('Error in assignDefaultRoles:', err);

      if (err instanceof HttpException) {
        throw err;
      }

      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
