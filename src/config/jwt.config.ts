/* eslint-disable prettier/prettier */
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';

export default class JwtConfig {
  static getJwtConfig(configService: ConfigService): JwtModuleOptions {
    return {
      secret: configService.get('JWT_SECRET'),
      signOptions: {
        expiresIn: configService.get('EXPIRED'),
      },
    };
  }
}

export const Config: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> =>
    JwtConfig.getJwtConfig(configService),
  inject: [ConfigService],
};
