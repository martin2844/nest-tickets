import { PartialType } from "@nestjs/mapped-types";
import { TicketDto } from "./ticket.dto";

//This partialType makes that the extended class properties will be marked optional
//ex title:string --> title?:string
export class UpdateTicketDto extends PartialType(TicketDto){
//Inherits all TicketDto properties, makes them optional,
//But also inherits all of the validators
}