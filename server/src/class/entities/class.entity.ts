import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import { School } from "./school.entity";
import { Student, Teacher, User } from "../../user/entities/user.entity";


@Entity()
export class Class {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    RoleName: string

    @OneToOne(() => School)
    @JoinColumn()
    School: number

    @ManyToMany(() => Student, user => user.UserClass, {nullable: true})
    @JoinColumn()
    ContainedStudents: User[];

    @ManyToMany(() => Teacher, user => user.UserClass, {nullable: true})
    ContainedTeachers: Teacher[];
}