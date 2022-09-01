import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Subject } from '../../user/entities/subject.entity';
import { User } from '../../user/entities/user.entity';
import { Task } from './task.entity';


@Entity()
export class Work {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Subject, (subject) => subject.Works)
    Subject: Subject;

    @OneToMany(() => Task, (task) => task.ParentWork)
    Tasks: Task[]
}