import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";


@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    refreshToken: string;

    @OneToOne(() => User)
    @JoinColumn()
    userId: User;
}