import { Controller, Delete, Get, Post, Patch, Param, Body, HttpCode, ParseIntPipe, ValidationPipe, Logger, NotFoundException } from '@nestjs/common';
import { MoreThan, Repository } from 'typeorm';
import { TicketDto } from './ticket.dto';
import { UpdateTicketDto } from './update-ticket.dto';
import { Ticket } from './ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('tickets')
export class TicketsController {
  private readonly logger = new Logger(TicketsController.name);
  
  constructor(
    @InjectRepository(Ticket)
    private readonly repository: Repository<Ticket>
    ) {}
 

  @Get('/thisYear')
  async thisYear():Promise<Ticket[]> {
    return this.repository.find({
      where: {
        createdAt: MoreThan(new Date('2021-01-01T00:00:00'))
      },
      order: {
        createdAt: 'DESC'
      }
    })
  }


  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id:number): Promise<Ticket> {
    let ticket = await this.repository.findOne(id);
    if(!ticket) {
      throw new NotFoundException()
    }
    return ticket;
  }

  @Get()
  async findAll() {
    this.logger.log("Searching all tickets");
    let tickets = await this.repository.find();
    this.logger.debug(`Total of ${tickets.length} found`);
    return tickets
  }
  @Post()
  //Validation pipe can be removed here since it was enabled globally at main.ts
  async create(@Body(ValidationPipe) input: TicketDto){
      return this.repository.save({
        ...input,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
  }

  @Patch(':id')
  async modifyOne(@Param('id') id, @Body() input:UpdateTicketDto){
    const ticket = await this.repository.findOne(id);
    if(!ticket) {
      throw new NotFoundException()
    }
    return await this.repository.save({
      ...ticket,
      ...input,
      updatedAt: new Date()
    })
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteOne(@Param('id') id){
    const ticket = await this.repository.findOne('id');
    if(!ticket) {
      throw new NotFoundException()
    }
    await this.repository.remove(ticket);
    return true;
  }
}
