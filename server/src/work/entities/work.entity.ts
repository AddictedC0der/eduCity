import { Class } from '../../class/entities/class.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinTable, JoinColumn, ManyToMany } from 'typeorm';
import { Subject } from '../../user/entities/subject.entity';
import { Teacher, User } from '../../user/entities/user.entity';
import { Solution } from './solution.entity';
import { Task } from './task.entity';


@Entity()
export class Work {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Subject, subject => subject.Works)
    Category: Subject;

    @Column()
    Name: string;

    @ManyToOne(() => Teacher, teacher => teacher.Works, {nullable: true, onDelete: 'SET NULL'})
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
    Time: number;

    @Column()
    AdditionalTime: number;

    @Column()
    Privacy: string;

    @ManyToMany(() => Class, classEntity => classEntity.ClassWorks)
    Classes: Class[];

    @OneToMany(() => Task, task => task.ParentWork)
    Tasks: Task[];

    @OneToMany(() => Solution, solution => solution.Work)
    Solutions: Solution[];
}