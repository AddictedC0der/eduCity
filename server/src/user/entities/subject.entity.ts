import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToMany, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Work } from 'src/work/entities/work.entity';

@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Work, (work) => work.id)
    works: Work[];
}