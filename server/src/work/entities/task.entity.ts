import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm';
import { TaskHashUiJSON } from '../dto/task.dto';
import { Work } from './work.entity';


@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    TaskIndex: number;

    @Column({
        type: 'json'
    })
    TaskHashUi: TaskHashUiJSON;

    @ManyToOne(() => Work, work => work.Tasks, {onDelete: 'CASCADE'})
    ParentWork: Work;
}