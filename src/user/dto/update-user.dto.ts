import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  username: string;
  role: number;
  password: string;
  usia: number;
  kamar: string;
  penyakit: string;
  nama: string;
}
