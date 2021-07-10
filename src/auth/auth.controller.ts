import { Controller, Post, UseGuards, Request, Logger, Get } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "src/user/user.entity";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./current-user.decorator";

@Controller('auth')
export class AuthController {

    private readonly logger = new Logger(AuthController.name);
    
    constructor(
        private readonly authService: AuthService
    ){}
 

    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(@CurrentUser() user:User ) {
        return {
            userId: user.id,
            token: this.authService.getTokenForUser(user)
        }

    }

    @Get("test2")
    @UseGuards(AuthGuard('jwt'))
    test(@CurrentUser() user:User) {
        return user
    }

}