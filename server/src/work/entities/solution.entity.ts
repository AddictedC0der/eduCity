import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinTable, JoinColumn } from 'typeorm';
import { Subject } from '../../user/entities/subject.entity';
import { Teacher, User } from '../../user/entities/user.entity';
import { Stats } from '../../user/entities/stats.entity';
import { Work } from './work.entity';
import { WorkLikeJSON } from '../dto/task.dto';


@Entity()
export class Solution {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Stats, stats => stats.Solutions, {onDelete: 'CASCADE'})
    Author: Stats;

    @ManyToOne(() => Work, work => work.Solutions, {onDelete: 'CASCADE'})
    Work: Work;

    @Column({
        type: 'json'
    })
    Content: WorkLikeJSON;

    @Column()
    Rating: number;
}