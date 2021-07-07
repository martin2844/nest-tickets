import { Controller, Get, NotFoundException, Param, ParseIntPipe, Post, ValidationPipe, Body } from "@nestjs/common";
import { UserDto } from "./user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";


@Controller('users')
export class UserController {


    constructor(private readonly service: UserService) {}

    
    @Get(":id")
    async findOne(@Param('id', ParseIntPipe) id:number):Promise<User> {
        return this.service.findOne(id);
    }

    @Post()
    async create(@Body(ValidationPipe) input:UserDto){
        return await this.service.save({
            ...input
        })
    }

}