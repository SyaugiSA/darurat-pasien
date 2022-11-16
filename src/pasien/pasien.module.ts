import { Module } from '@nestjs/common';
import { PasienService } from './pasien.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pasien } from './entities/pasien.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pasien])],
  controllers: [],
  providers: [PasienService],
  exports: [TypeOrmModule, PasienService],
})
export class PasienModule {}
