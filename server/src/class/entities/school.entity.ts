import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class School {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    SchoolName: string

    @Column()
    Address: string
}