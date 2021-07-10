import { IsEmail } from "class-validator";
import { Ticket } from "src/tickets/ticket.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @IsEmail()
    @Column({unique: true})
    email: string;

    @Column({
        nullable: true
    })
    password: string;

    @Column()
    type: string;

    @OneToMany(() => Ticket, ticket => ticket.owner)
    tickets: Ticket[]

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}