import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Subject } from '../../user/entities/subject.entity';
import { Teacher, User } from '../../user/entities/user.entity';
import { Task } from './task.entity';


@Entity()
export class Work {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Subject, (subject) => subject.Works)
    Category: Subject;

    @Column()
    Name: string;

    @OneToMany(() => Teacher, teacher => teacher.Works)
    Author: Teacher;

    @Column()
    Class: number

    @Column()
    Difficulty: number;

    @Column()
    AutoChecking: boolean;

    @Column()
    AdvancedChecking: boolean;

    @Column()
    Time: string;

    @Column()
    AdditionalTime: string;

    @Column()
    Privacy: string;

    @OneToMany(() => Task, (task) => task.ParentWork)
    Tasks: Task[]
}