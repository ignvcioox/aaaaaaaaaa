import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USER', 'fazt'),
        password: configService.get<string>('DB_PASSWORD', 'faztcode'),
        database: configService.get<string>('DB_NAME', 'brewly_db'),
        entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
        synchronize: true,
        logging: configService.get<boolean>('DB_LOGGING', false),
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
