import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm';
import { Work } from './work.entity';


@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Work, (work) => work.Tasks)
    ParentWork: number

    @Column()
    TaskIndex: number;

    @Column()
    TaskHashUi: string;
}