import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";

@Module({
    imports: [TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
        useFactory: () => ({
            secret: process.env.JWT_SECRET, 
            signOptions: {
                expiresIn: '60m'
            }
        })
    })
    ],
    providers: [LocalStrategy, AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {

}