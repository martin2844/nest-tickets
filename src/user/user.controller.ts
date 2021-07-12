import { Controller, Get, NotFoundException, Param, ParseIntPipe, Post, ValidationPipe, Body, BadRequestException, SerializeOptions, UseInterceptors, ClassSerializerInterceptor } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { UserDto } from "./user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";


@Controller('users')
@SerializeOptions({strategy: "excludeAll"})
export class UserController {


    constructor(private readonly service: UserService, private readonly authService: AuthService) {}

    
    @Get(":id")
    @UseInterceptors(ClassSerializerInterceptor)
    async findOne(@Param('id', ParseIntPipe) id:number):Promise<User> {
        return this.service.findOne(id);
    }

    @Get('email/:email')
    @UseInterceptors(ClassSerializerInterceptor)
    async findByMail(@Param('email') email:string):Promise<User>{
        return this.service.findByMail(email);
    }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    async create(@Body(ValidationPipe) input:UserDto):Promise<User>{

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