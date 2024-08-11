import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilsService {
  private readonly saltRounds = 10;

  constructor() {}

  @OnEvent('utils.hashPassword')
  async hashPassword({ password }: { password: string }): Promise<string> {
    try {
      const hash = await bcrypt.hash(password, this.saltRounds);
      return hash;
    } catch (error) {
      throw new Error('Error hashing password');
    }
  }

  @OnEvent('utils.comparePassword')
  async comparePassword({
    password,
    hash,
  }: {
    password: string;
    hash: string;
  }): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      throw new Error('Error comparing passwords');
    }
  }
}
