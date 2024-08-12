import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RolesModule } from './modules/roles/roles.module';
import { RoleService } from './modules/roles/service/role.service';
import { UtilsService } from './modules/utils/utils.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    UsersModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService, UtilsService],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor(private readonly roleService: RoleService) {}

  async onModuleInit() {
    // Ensure default roles are set up
    await this.roleService.assignDefaultRoles();
    console.log('assignDefaultRoles: true');
  }
}
