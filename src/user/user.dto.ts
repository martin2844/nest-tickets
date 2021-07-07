import {IsDate, IsDateString, IsString, Length} from 'class-validator' 

export class UserDto {
    @IsString()
    name: string;
    @IsString()
    email: string;
    @IsString()
    type: string;
}