import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Ticket } from "src/tickets/ticket.entity";
import { User } from "src/user/user.entity";

export default registerAs(
    'orm.config',
    ():TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Ticket, User],
    synchronize: true
  })
  )