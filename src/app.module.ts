import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from '@config/database.module';

import { AuthModule } from '@modules/auth/auth.module';
import { FilesModule } from '@modules/files/files.module';
import { ProductsModule } from '@modules/products/products.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
   imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      ScheduleModule.forRoot(),
      DatabaseModule,
      AuthModule,
      FilesModule,
      ProductsModule,
   ],
   controllers: [],
   providers: [],
})
export class AppModule { }
