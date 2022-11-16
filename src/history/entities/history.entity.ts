import { Pasien } from 'src/pasien/entities/pasien.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  kamar: string;

  @Column()
  tanggal: string;

  @ManyToOne(() => Pasien, (pasien) => pasien.histories)
  pasien: Pasien | number;
}
