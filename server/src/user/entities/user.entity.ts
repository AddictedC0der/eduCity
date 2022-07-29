import { Stats } from './stats.entity';
import { Class } from 'src/class/entities/class.entity';
import { Subject } from './subject.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, JoinColumn, OneToOne } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    password: string;

    @Column()
    email: string;
    
    @ManyToMany(() => Role)
    @JoinTable()
    role: Role[];
}


export class Teacher extends User {
    @ManyToMany(() => Subject)
    @JoinTable()
    subject: Subject[];

    @ManyToMany(() => Class)
    @JoinTable()
    class: Class[];
}

export class Student extends User {
    @OneToOne(() => Stats, (stats) => stats.id)
    @JoinColumn()
    stats: number;

    @ManyToMany(() => Class)
    @JoinTable()
    class: Class[];
}