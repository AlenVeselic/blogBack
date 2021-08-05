import{
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from "typeorm";
import { userprofile } from "./userprofile";


@Entity()
export class JobTitle{
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name!: string;
    @OneToMany(() => userprofile, profile => profile.jobTitle)
    profiles!: userprofile[];
}





