import { PartialType } from '@nestjs/mapped-types';
import { CreatePanicDto } from './create-panic.dto';

export class UpdatePanicDto extends PartialType(CreatePanicDto) {
  status?: number;
}
