import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import { School } from "./school.entity";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Class {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    name: string

    @OneToOne(() => School)
    @JoinColumn()
    school: number

    @ManyToMany(() => User)
    @JoinColumn()
    user: User[]
}