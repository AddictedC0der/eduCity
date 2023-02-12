import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { Student, User } from './user.entity';
import { Solution } from '../../work/entities/solution.entity';


@Entity()
export class Stats {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Solution, solution => solution.Author)
    Solutions: Solution[];

    @OneToOne(() => Student, user => user.UserStats, {nullable: true, onDelete: 'CASCADE'})
    MasterUser: Student;
}