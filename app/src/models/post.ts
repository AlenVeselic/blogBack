import { text } from "express";
import{
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { User } from "./user";

@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    title!: string;
    @Column({
        type:"text",
    })
    content!: string;

    @ManyToOne((_type) => User, (user: User) => user.posts)
    @JoinColumn()
    user!: User;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}