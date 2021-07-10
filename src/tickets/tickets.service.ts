import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { MoreThan, Repository } from 'typeorm';
import { TicketDto } from './ticket.dto';
import { Ticket } from './ticket.entity';
import { UpdateTicketDto } from './update-ticket.dto';

@Injectable()
export class TicketsService {

  constructor(
    @InjectRepository(Ticket)
    private readonly repository: Repository<Ticket>
    ) {}

    //Finds all tickets from this year
    thisYear() {
      return this.repository.find({
        where: {
          createdAt: MoreThan(new Date('2021-01-01T00:00:00'))
        },
        order: {
          createdAt: 'DESC'
        }
      })
    }

    async findFromUser(id: number, user: User): Promise<Ticket[] | null> {
      
      if(id !== user.id) {
        throw new UnauthorizedException()
      }

      return this.repository.find({
          where: {
            owner: id
          }
      })

    }

    //Finds ticket by id
    async findOne(id:number): Promise<Ticket> {
      let ticket = await this.repository.findOne(id, {
        relations: ['assignedTo', 'owner']
      });
      if(!ticket) {
        throw new NotFoundException()
      }
      return ticket;
    }

    //Finds all tickets
    async findAll(): Promise<Ticket[] | null> {
      return this.repository.find();
    }

    //Creates a Ticket
    async create(input: TicketDto, user: User): Promise<Ticket> {
      return this.repository.save({
        ...input,
        owner: user,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    }

    //Modifies a Ticket
    async modifyOne(id: number, input: UpdateTicketDto, user: User): Promise<Ticket> {
      const ticket = await this.repository.findOne(id);
      if(!ticket) {
        throw new NotFoundException()
      }
      if(user.type !== "Admin") {
        throw new UnauthorizedException();
      }
      return this.repository.save({
        ...ticket,
        ...input,
        updatedAt: new Date()
      })
    }

    //Deletes a ticket
    async deleteOne(id:number, user: User): Promise<Boolean>{
      const ticket = await this.repository.findOne(id);
      if(!ticket) {
        throw new NotFoundException()
      }
      if(user.type !== "Admin") {
        throw new UnauthorizedException();
      }
      await this.repository.remove(ticket);
      return true;
    }

}
