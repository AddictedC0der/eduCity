import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";


@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    refreshToken: string;

    @OneToOne(() => User, user => user.Token, {onDelete: 'CASCADE'})
    UserId: User;
}