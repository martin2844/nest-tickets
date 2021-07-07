import { Ticket } from "src/tickets/ticket.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    type: string;

    @OneToMany(() => Ticket, ticket => ticket.owner)
    tickets: Ticket[]

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}