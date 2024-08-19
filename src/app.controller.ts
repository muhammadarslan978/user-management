import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as mongoose from 'mongoose';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/health')
  healthCheck(): string {
    const mongoState = mongoose.connection.readyState;
    if (mongoState === 1) {
      return 'Healthy';
    } else {
      return 'Unhealthy';
    }
  }
}
