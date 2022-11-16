import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasienModule } from 'src/pasien/pasien.module';
import { NakesModule } from 'src/nakes/nakes.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PasienModule, NakesModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
