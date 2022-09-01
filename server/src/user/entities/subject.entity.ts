import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToMany, OneToMany } from 'typeorm';
import { Teacher, User } from './user.entity';
import { Work } from '../../work/entities/work.entity';

@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    SubjectName: string;

    @OneToMany(() => Work, work => work.id, {nullable: true})
    Works: Work[];

    @ManyToMany(() => Teacher, teacher => teacher.UserSubject, {nullable: true})
    Users: User[];
}