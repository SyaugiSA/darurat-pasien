import { Module } from '@nestjs/common';
import { NakesService } from './nakes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nake } from './entities/nake.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nake])],
  controllers: [],
  providers: [NakesService],
  exports: [TypeOrmModule, NakesService],
})
export class NakesModule {}
