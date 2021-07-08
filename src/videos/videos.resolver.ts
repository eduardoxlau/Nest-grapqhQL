import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Video } from './videos.entity';
import { VideosService } from './videos.service';
import { VideoInput } from './dto/input/video.input';
import { GetVideoArgs } from './dto/args/get-videos.arg';
import { GqlAuthGuard } from './../auth/guards/gpl-auth.guard';

@Resolver(() => Video)
export class VideosResolver {
  constructor(private readonly _VideosService: VideosService) {}

  @Query(() => [Video])
  @UseGuards(GqlAuthGuard)
  getVideos(): Promise<Video[]> {
    return this._VideosService.getVideos();
  }

  @Query(() => Video)
  @UseGuards(GqlAuthGuard)
  getVideo(@Args() getVideoArgs: GetVideoArgs): Promise<Video> {
    return this._VideosService.getVideo(getVideoArgs);
  }

  @Mutation(() => Video)
  @UseGuards(GqlAuthGuard)
  createVideo(
    @Args('input')
    input: VideoInput,
  ): Promise<Video> {
    return this._VideosService.createVideo(input);
  }

  @Mutation(() => Video)
  @UseGuards(GqlAuthGuard)
  updateVideo(
    @Args('input')
    input: VideoInput,
  ): Promise<Video> {
    return this._VideosService.updateVideo(input);
  }

  @Mutation(() => Video, { nullable: true })
  @UseGuards(GqlAuthGuard)
  deleteVideo(
    @Args('id')
    id: string,
  ): Promise<void> {
    return this._VideosService.deleteVideo(id);
  }
}
