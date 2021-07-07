import {IsString, Length} from 'class-validator' 

export class TicketDto {
    //This decorator makes the length minimum 5 characters
    //You can pass optional parameters
    //You can also stack Validation Decorators.
    @Length(5, 255, {message: "The title length is not long enough"})
    @IsString()
    title: string;
    @Length(20, 255)
    description: string;
}