import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Video } from './videos.entity';
import { VideosService } from './videos.service';
import { VideoInput } from './dto/input/video.input';
import { GetVideoArgs } from './dto/args/get-videos.arg';

@Resolver(() => Video)
export class VideosResolver {
  constructor(private readonly _VideosService: VideosService) {}

  @Query(() => [Video])
  getVideos(): Promise<Video[]> {
    return this._VideosService.getVideos();
  }

  @Query(() => Video)
  getVideo(@Args() getVideoArgs: GetVideoArgs): Promise<Video> {
    return this._VideosService.getVideo(getVideoArgs);
  }

  @Mutation(() => Video)
  createVideo(
    @Args('input')
    input: VideoInput,
  ): Promise<Video> {
    return this._VideosService.createVideo(input);
  }

  @Mutation(() => Video)
  updateVideo(
    @Args('input')
    input: VideoInput,
  ): Promise<Video> {
    return this._VideosService.updateVideo(input);
  }

  @Mutation(() => Video, { nullable: true })
  deleteVideo(
    @Args('id')
    id: string,
  ): Promise<void> {
    return this._VideosService.deleteVideo(id);
  }
}
