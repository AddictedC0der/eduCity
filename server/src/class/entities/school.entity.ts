import { User } from "../../user/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";


@Entity()
export class School {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    SchoolName: string

    @Column()
    Address: string

    @Column()
    Link: string;

    @Column()
    Rating: number;

    @ManyToMany(() => User, {eager: true})
    @JoinTable()
    Admins: User[];
}