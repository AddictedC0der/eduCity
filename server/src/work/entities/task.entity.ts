import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm';
import { Work } from './work.entity';


@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Work, (work) => work.tasks)
    work: number

    @Column()
    index: number;

    @Column()
    hashUi: string;
}