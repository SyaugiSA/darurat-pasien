import { History } from 'src/history/entities/history.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Pasien {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10, unique: true })
  no_rmd: string;

  @Column({ length: 40 })
  nama: string;

  @Column()
  usia: number;

  @Column({ length: 10 })
  kamar: string;

  @Column({ length: 30 })
  penyakit: string;

  @OneToMany(() => History, (history) => history.pasien)
  histories: History[];

  @Column()
  userId: number;
}
