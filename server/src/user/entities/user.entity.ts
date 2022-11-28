import { Stats } from './stats.entity';
import { Class } from '../../class/entities/class.entity';
import { Subject } from './subject.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, JoinColumn, OneToOne, BaseEntity, OneToMany, TableInheritance, ChildEntity } from 'typeorm';
import { Token } from '../../auth/entities/token.entity';
import { Work } from 'src/work/entities/work.entity';

@Entity()
@TableInheritance({column: {type: 'varchar', name: 'Role'}})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    UserLogin: string;

    @Column()
    UserPassword: string;

    @Column()
    UserEmail: string;

    @OneToOne(() => Token, token => token.UserId, {nullable: true, onDelete: 'SET NULL'})
    @JoinColumn()
    Token: Token;
}


@ChildEntity()
export class Parent extends User {
    @OneToMany(() => Student, child => child.Parent, {onDelete: 'SET NULL', nullable: true})
    @JoinColumn()
    Children: Student[];
}


@ChildEntity()
export class Teacher extends User {
    @ManyToMany(() => Subject, subject => subject.Users)
    @JoinTable()
    UserSubject: Subject[];

    @ManyToMany(() => Class, cls => cls.ContainedTeachers)
    @JoinTable()
    UserClass: Class[];

    @OneToMany(() => Work, work => work.Author)
    @JoinColumn()
    Works: Work[];
}


@ChildEntity()
export class Student extends User {
    @OneToOne(() => Stats, stats => stats.MasterUser, {nullable: true})
    @JoinColumn()
    UserStats: Stats;

    @ManyToMany(() => Class, cls => cls.ContainedStudents, {onDelete: 'SET NULL', nullable: true})
    @JoinTable()
    UserClass: Class[];

    @ManyToOne(() => Parent, parent => parent.Children, {onDelete: 'SET NULL', nullable: true})
    Parent: Parent;
}


