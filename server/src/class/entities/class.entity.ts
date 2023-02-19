import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import { School } from "./school.entity";
import { Student, Teacher, User } from "../../user/entities/user.entity";
import { Work } from "../../work/entities/work.entity";


@Entity()
export class Class {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    Name: string

    @OneToOne(() => School)
    @JoinColumn()
    School: School

    @ManyToMany(() => Work, work => work.Classes, {nullable: true})
    @JoinTable()
    ClassWorks: Work[];

    @ManyToMany(() => Student, student => student.Classes, {nullable: true, eager: true})
    @JoinTable()
    ContainedStudents: Student[];

    @ManyToMany(() => Teacher, teacher => teacher.Classes, {nullable: true, eager: true})
    @JoinTable()
    ContainedTeachers: Teacher[];
}