import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm';
import { Work } from './work.entity';


@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    TaskIndex: number;

    @Column()
    TaskHashUi: string;

    @ManyToOne(() => Work, work => work.id)
    ParentWork: Work;
}