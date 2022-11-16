import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';
import { PasienModule } from './pasien/pasien.module';
import { NakesModule } from './nakes/nakes.module';
import { HistoryModule } from './history/history.module';
import { ConfigModule } from '@nestjs/config';
import { DBConfig } from './config/db.config';
import { AuthModule } from './auth/auth.module';
import { PanicModule } from './panic/panic.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(DBConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    PasienModule,
    NakesModule,
    HistoryModule,
    AuthModule,
    PanicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
