import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FilesController } from '@modules/files/files.controller';
import { FilesService } from '@modules/files/files.service';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [ConfigModule],
})
export class FilesModule {}
