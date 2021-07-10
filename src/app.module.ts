import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import ormConfig from './config/orm.config';
import ormConfigProd from './config/orm.config.prod';
import { Ticket } from './tickets/ticket.entity';
import { TicketsModule } from './tickets/tickets.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: process.env.NODE_ENV !== "prod" ? ormConfig : ormConfigProd
    }),
  AuthModule,
  TicketsModule,
  UserModule
],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}
