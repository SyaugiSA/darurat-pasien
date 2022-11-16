import { PartialType } from '@nestjs/mapped-types';
import { CreatePasienDto } from './create-pasien.dto';

export class UpdatePasienDto extends PartialType(CreatePasienDto) {
  username: string;
  nama: string;
  usia: number;
  kamar: string;
  penyakit: string;
}
