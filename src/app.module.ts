import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UtilsService } from './modules/utils/utils.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, UtilsService],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor() {}
}
