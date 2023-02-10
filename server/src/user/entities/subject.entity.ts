import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToMany, OneToMany, JoinColumn } from 'typeorm';
import { Teacher, User } from './user.entity';
import { Work } from '../../work/entities/work.entity';

@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    SubjectName: string;

    @OneToMany(() => Work, work => work.Category, {nullable: true})
    Works: Work[];

    @ManyToMany(() => Teacher, teacher => teacher.UserSubject, {nullable: true})
    Users: User[];
}