import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { PanicService } from './panic.service';
import { UpdatePanicDto } from './dto/update-panic.dto';

@Controller('panic')
export class PanicController {
  constructor(private readonly panicService: PanicService) {}

  @Get()
  findAll() {
    return this.panicService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePanicDto: UpdatePanicDto) {
    return this.panicService.update(id, updatePanicDto);
  }
}
