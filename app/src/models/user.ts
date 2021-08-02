import { userprofile } from "./userprofile";
import { Post } from "./post";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    OneToMany,
} from "typeorm";


@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;
    @Column()
    email!: string;
    @Column()
    pass!: string;
    @Column()
    name!: string;
    @Column()
    surname!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToOne(() => userprofile)
    @JoinColumn()
    profile!: userprofile;
    

    @OneToMany((_type) => Post, (post: Post) => post.user)
    posts!: Array<Post>;


}