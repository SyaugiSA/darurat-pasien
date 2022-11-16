import { Module } from '@nestjs/common';
import { PanicService } from './panic.service';
import { PanicController } from './panic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Panic } from './entities/panic.entity';
import { HistoryModule } from 'src/history/history.module';
import { PasienModule } from 'src/pasien/pasien.module';

@Module({
  imports: [TypeOrmModule.forFeature([Panic]), HistoryModule, PasienModule],
  controllers: [PanicController],
  providers: [PanicService],
})
export class PanicModule {}
