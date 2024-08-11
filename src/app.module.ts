import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { RoleService } from './modules/users/service/role/role.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly roleService: RoleService,
  ) {}

  async onModuleInit() {
    // Ensure default roles are set up
    await this.roleService.assignDefaultRoles();
    console.log('assignDefaultRoles: true');
  }
}
