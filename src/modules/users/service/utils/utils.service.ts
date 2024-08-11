import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class UtilsService {
  constructor() {}

  @OnEvent('utils.hashPassword')
  hashPassword({ password }: { password: string }): any {
    const hash = password;
    return hash;
  }
}
