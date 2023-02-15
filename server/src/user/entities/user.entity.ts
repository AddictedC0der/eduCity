import { Stats } from './stats.entity';
import { Class } from '../../class/entities/class.entity';
import { Subject } from './subject.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, JoinColumn, OneToOne, BaseEntity, OneToMany, TableInheritance, ChildEntity } from 'typeorm';
import { Token } from '../../auth/entities/token.entity';
import { Work } from '../../work/entities/work.entity';

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

    @Column()
    Role: string;
}


@ChildEntity()
export class Parent extends User {
    @OneToMany(() => Student, child => child.Parent, {onDelete: 'SET NULL', nullable: true})
    Children: Student[];
}


@ChildEntity()
export class Teacher extends User {
    @ManyToMany(() => Subject, subject => subject.Users)
    @JoinTable()
    UserSubject: Subject[];

    @OneToMany(() => Work, work => work.Author)
    Works: Work[];
}


@ChildEntity()
export class Student extends User {
    @OneToOne(() => Stats, stats => stats.MasterUser, {nullable: true})
    @JoinColumn()
    UserStats: Stats;

    @ManyToOne(() => Parent, parent => parent.Children, {onDelete: 'SET NULL', nullable: true})
    Parent: Parent;
}

