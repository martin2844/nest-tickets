import { Controller, Delete, Get, Post, Patch, Param, Body, HttpCode, ParseIntPipe, ValidationPipe, Logger, UseGuards } from '@nestjs/common';
import { TicketDto } from './ticket.dto';
import { UpdateTicketDto } from './update-ticket.dto';
import { Ticket } from './ticket.entity';
import { TicketsService } from './tickets.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/user/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('tickets')
export class TicketsController {
  private readonly logger = new Logger(TicketsController.name);
  
  constructor(
    private readonly service: TicketsService
    ) {}
 

  @Get('/thisYear')
  async thisYear():Promise<Ticket[]> {
    return this.service.thisYear();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id:number): Promise<Ticket> {
    return this.service.findOne(id);
  }

  @Get('/user/:id')
  @UseGuards(AuthGuard('jwt'))
  async findFromUser(@Param('id', ParseIntPipe) id:number, @CurrentUser() user: User): Promise<Ticket[] | null> {
    return this.service.findFromUser(id, user);
  }

  @Get()
  async findAll() {
    this.logger.log("Searching all tickets");
    let tickets = await this.service.findAll();
    this.logger.debug(`Total of ${tickets.length} found`);
    return tickets
  }

  //Create Ticket API, needs to be authenticated to create a Ticket.
  //Owner will be Current User.
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body(ValidationPipe) input: TicketDto, @CurrentUser() user: User){
    return this.service.create(input, user); 
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async modifyOne(@Param('id') id, @Body() input:UpdateTicketDto, @CurrentUser() user: User){
      return this.service.modifyOne(id, input, user);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'))
  async deleteOne(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User){
      return this.service.deleteOne(id, user);
  }
}
