import { Inject, Injectable } from '@nestjs/common';

import { JWT_SERVICE, PASSWORD_SERVICE } from '../constants';
import { IJwtService } from '../interfaces/ijwt-service.interface';
import { IPasswordService } from '../interfaces/ipassword-service.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(JWT_SERVICE) private readonly jwtService: IJwtService,
    @Inject(PASSWORD_SERVICE)
    private readonly passwordService: IPasswordService,
  ) {}

  async generateToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }

  async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return this.passwordService.compare(plainTextPassword, hashedPassword);
  }
}
