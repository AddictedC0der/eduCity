import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Student, User } from './user.entity';


@Entity()
export class Stats {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    CompletedWorks: number;

    @Column()
    LostWorks: number;

    @OneToOne(() => Student, user => user.UserStats, {nullable: true, onDelete: 'CASCADE'})
    MasterUser: Student;
}