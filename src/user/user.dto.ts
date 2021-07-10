import {IsDate, IsDateString, IsEmail, IsString, Length} from 'class-validator' 

export class UserDto {
    @IsString()
    name: string;
    @IsString()
    @IsEmail()
    email: string;
    @IsString()
    type: string;
    
    password: string;
    password2: string;
    
}