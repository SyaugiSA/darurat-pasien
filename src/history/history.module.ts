import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './entities/history.entity';
import { PasienModule } from 'src/pasien/pasien.module';

@Module({
  imports: [TypeOrmModule.forFeature([History]), PasienModule],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [TypeOrmModule, HistoryService],
})
export class HistoryModule {}
