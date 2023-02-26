import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToMany, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Teacher, User } from './user.entity';
import { Work } from '../../work/entities/work.entity';
import { Subject } from './subject.entity';


@Entity()
export class Resource {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Link: string;

    @OneToOne(() => Subject, {eager: true})
    @JoinColumn()
    Category: Subject;

    @ManyToOne(() => User, {eager: true})
    Author: User;
}