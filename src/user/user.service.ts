import { BadRequestException, Body, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDto } from "./user.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>
        ) {}

    async findOne(id:number):Promise<User> {
        let user = await this.repository.findOne(id);
        if(!user) {
            throw new NotFoundException();
        }
        return user;
    }

    async findByMail(email: string):Promise<User> {
        let user = await this.repository.findOne({
            where: {
                email
            }
        })
        if(!user) {
            throw new NotFoundException();
        }
        return user;
    }

    
    async checkIfUserExists(email: string):Promise<Boolean> {
        let user = await this.repository.findOne({
            where: {
                email
            }
        })
        if(user) {
            throw new BadRequestException(["User allready exists"]);
        }
        return true;
    }


    async save(input: UserDto) {
        let newUser = await this.repository.save({
            ...input,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        })
        newUser.password = "";
        newUser.password2 = "";
        return newUser
    }
        
}