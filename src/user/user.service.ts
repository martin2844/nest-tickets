import { Body, Injectable, NotFoundException } from "@nestjs/common";
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

    async save(input: UserDto) {
        return this.repository.save({
            ...input,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        })
    }
        
}