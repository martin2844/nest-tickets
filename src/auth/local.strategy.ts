import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy } from "passport-local";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    private readonly logger = new Logger(LocalStrategy.name);

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
        super({usernameField: 'email'});
    }

    public async validate(email: string, password: string): Promise<any>{
        this.logger.log("SEARCHING")
        const user = await this.userRepository.findOne({
            where: {
                email
            }
        })

        if(!user) {
            this.logger.log(`User ${email} not found`);
            throw new UnauthorizedException();
        }

        if(!(await bcrypt.compare(password, user.password))) {
            this.logger.log(`User ${email} entered incorrect password`);
            throw new UnauthorizedException();
        }

        return user;

    }

}