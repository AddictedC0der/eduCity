import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Subject } from '../../user/entities/subject.entity';
import { User } from 'src/user/entities/user.entity';
import { Task } from './task.entity';


@Entity()
export class Work {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Subject, (subject) => subject.works)
    subject: Subject;

    @OneToMany(() => Task, (task) => task.work)
    tasks: Task[]
}