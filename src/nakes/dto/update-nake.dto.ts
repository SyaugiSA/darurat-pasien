import { PartialType } from '@nestjs/mapped-types';
import { CreateNakeDto } from './create-nake.dto';

export class UpdateNakeDto extends PartialType(CreateNakeDto) {
  username: string;
  nama: string;
}
