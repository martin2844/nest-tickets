import {IsDate, IsDateString, IsEmail, IsString, Length, MinLength} from 'class-validator' 

export class UserDto {
    @IsString()
    name: string;
    @IsString()
    @IsEmail()
    email: string;
    @IsString()
    type: string;
    
    @MinLength(6)
    password: string;
    password2: string;
    
}