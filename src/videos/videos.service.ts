import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Video } from './videos.entity';
import { VideoInput } from './dto/input/video.input';
import { VideoRepository } from './videos.repository';
import { GetVideoArgs } from './dto/args/get-videos.arg';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(VideoRepository)
    private readonly _VideoRepository: VideoRepository,
  ) {}

  async getVideos(): Promise<Video[]> {
    return this._VideoRepository.find();
  }

  async getVideo(input: GetVideoArgs): Promise<Video> {
    const { id } = input;
    return await this._VideoRepository.findOne(id);
  }

  async createVideo(input: VideoInput): Promise<Video> {
    return await this._VideoRepository.save(input);
  }
  async updateVideo(input: VideoInput): Promise<Video> {
    const { id, ...data } = input;
    await this._VideoRepository.update(id, data);
    return this.getVideo(input);
  }

  async deleteVideo(id: string): Promise<void> {
    await this._VideoRepository.delete(id);
  }
}
