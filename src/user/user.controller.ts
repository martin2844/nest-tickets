import { Controller, Get, NotFoundException, Param, ParseIntPipe, Post, ValidationPipe, Body, BadRequestException } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { UserDto } from "./user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";


@Controller('users')
export class UserController {


    constructor(private readonly service: UserService, private readonly authService: AuthService) {}

    
    @Get(":id")
    async findOne(@Param('id', ParseIntPipe) id:number):Promise<User> {
        return this.service.findOne(id);
    }

    @Get('email/:email')
    async findByMail(@Param('email') email:string):Promise<User>{
        return this.service.findByMail(email);
    }
    @Post()
    async create(@Body(ValidationPipe) input:UserDto){

        if(input.password !== input.password2) {
            throw new BadRequestException(["Passwords must match"]);
        }

        await this.service.checkIfUserExists(input.email);

        input.password = await this.authService.hashPassword(input.password);
        
        return await this.service.save({
            ...input
        })
    }

}