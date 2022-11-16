import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 10 })
  username: string;

  @Column({ default: 1 })
  role: number;

  @Column()
  password: string;
}
