import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketsService {
  getTicket(): string {
    return 'Hello Ticket!';
  }
}
