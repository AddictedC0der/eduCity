import { User } from "../../user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";


@Entity()
export class ChatMessage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    sendTime: string;

    @Column()
    isEdited: boolean;

    @OneToOne(() => ChatMessage)
    @JoinColumn()
    replyTo: ChatMessage;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn()
    author: User;
}