import { Controller, Delete, Get, Post, Patch, Param, Body, HttpCode, ParseIntPipe, ValidationPipe, Logger, NotFoundException } from '@nestjs/common';
import { TicketDto } from './ticket.dto';
import { UpdateTicketDto } from './update-ticket.dto';
import { Ticket } from './ticket.entity';
import { TicketsService } from './tickets.service';

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

  @Get()
  async findAll() {
    this.logger.log("Searching all tickets");
    let tickets = await this.service.findAll();
    this.logger.debug(`Total of ${tickets.length} found`);
    return tickets
  }

  @Post()
  async create(@Body(ValidationPipe) input: TicketDto){
    return this.service.create(input);
  }

  @Patch(':id')
  async modifyOne(@Param('id') id, @Body() input:UpdateTicketDto){
      return this.service.modifyOne(id, input);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteOne(@Param('id', ParseIntPipe) id: number){
      return this.service.deleteOne(id);
  }
}
