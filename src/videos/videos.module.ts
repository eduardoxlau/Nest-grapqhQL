import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VideosService } from './videos.service';
import { VideosResolver } from './videos.resolver';
import { VideoRepository } from './videos.repository';

@Module({
  imports: [TypeOrmModule.forFeature([VideoRepository])],
  providers: [VideosResolver, VideosService],
})
export class VideosModule {}
