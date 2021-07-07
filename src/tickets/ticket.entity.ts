import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


//The first parameter will determine the name of the table
@Entity('ticket')

export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', )
    title: string;

    @Column()
    description: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @ManyToOne(() => User, user => user.tickets)
    assignedTo: User;

    @ManyToOne(() => User, user => user.tickets)
    owner: User;


}