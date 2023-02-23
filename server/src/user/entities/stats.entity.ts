import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { Student, Teacher, User } from './user.entity';
import { Solution } from '../../work/entities/solution.entity';
import { Work } from '../../work/entities/work.entity';


@Entity()
export class StudentStats {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Solution, solution => solution.Author)
    Solutions: Solution[];

    @OneToOne(() => Student, user => user.UserStats, {nullable: true, onDelete: 'CASCADE'})
    MasterUser: Student;
}


// @Entity()
// export class TeacherStats {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @OneToMany(() => Solution, solution => solution.Author)
//     Works: Work[];

//     @OneToOne(() => Teacher, user => user.UserStats, {nullable: true, onDelete: 'CASCADE'})
//     MasterUser: Teacher;
// }