import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinTable, JoinColumn } from 'typeorm';
import { Subject } from '../../user/entities/subject.entity';
import { Teacher, User } from '../../user/entities/user.entity';
import { StudentStats } from '../../user/entities/stats.entity';
import { Work } from './work.entity';
import { WorkLikeJSON } from '../dto/task.dto';


@Entity()
export class Solution {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => StudentStats, stats => stats.Solutions, {onDelete: 'CASCADE'})
    Author: StudentStats;

    @ManyToOne(() => Work, work => work.Solutions, {onDelete: 'CASCADE'})
    Work: Work;

    @Column({
        type: 'json'
    })
    Content: WorkLikeJSON;

    @Column()
    Rating: string;
}