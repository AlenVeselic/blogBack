import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    ManyToOne,
    JoinColumn,
} from "typeorm";

import { JobTitle } from "./jobTitle";
import { User } from "./user";

@Entity()
export class userprofile{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    profilePic!: string;
    @Column()
    webPage!: string;
    @Column()
    phoneNumber!: string;
    @Column()
    age!: string;
    @Column()
    gender!: Number;
    @Column({
        type: "text",
    })
    bio!: string;

    @OneToOne(() => User, user => user.profile)
    user!: User;

    @ManyToOne((_type) => JobTitle, (jobTitle: JobTitle) => jobTitle.profiles)
    jobTitle!: JobTitle;
    
}