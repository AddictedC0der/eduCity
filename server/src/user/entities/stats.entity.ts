import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';


@Entity()
export class Stats {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    completedWorks: number;

    @Column()
    lostWorks: number;
}