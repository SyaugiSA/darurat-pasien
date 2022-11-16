import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Panic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: number;
}
