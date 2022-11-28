import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  create(@Body() createHistoryDto: CreateHistoryDto) {
    return this.historyService.create(createHistoryDto);
  }

  @Get('last')
  last() {
    return this.historyService.last();
  }

  @Get()
  findAll() {
    return this.historyService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.historyService.find(id);
  }
}
