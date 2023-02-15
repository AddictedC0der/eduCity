import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import { School } from "./school.entity";
import { Student, Teacher, User } from "../../user/entities/user.entity";


@Entity()
export class Class {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    Name: string

    @OneToOne(() => School)
    @JoinColumn()
    School: School

    @ManyToMany(() => User, {nullable: true})
    @JoinTable()
    ContainedStudents: User[];

    @ManyToMany(() => User, {nullable: true})
    @JoinTable()
    ContainedTeachers: User[];
}