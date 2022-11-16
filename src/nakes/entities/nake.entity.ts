import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Nake {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40 })
  nama: string;

  @Column({ length: 10 })
  no_nakes: string;

  @Column()
  userId: number;
}
