export interface IAuthService {
  generateToken(payload: any): Promise<string>;
  verifyToken(token: string): Promise<any>;
  comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
