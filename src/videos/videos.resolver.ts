import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Video } from './videos.entity';
import { VideosService } from './videos.service';
import { VideoInput } from './dto/input/video.input';
import { GetVideoArgs } from './dto/args/get-videos.arg';
import { RolesGuard } from './../auth/guards/roles.guard';
import { Admin } from './../auth/decorators/admin.decorator';
import { GqlAuthGuard } from './../auth/guards/gpl-auth.guard';

@Resolver(() => Video)
export class VideosResolver {
  constructor(private readonly _VideosService: VideosService) {}

  @Query(() => [Video])
  @Admin()
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  getVideos(): Promise<Video[]> {
    return this._VideosService.getVideos();
  }

  @Query(() => Video)
  @Admin()
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  getVideo(@Args() getVideoArgs: GetVideoArgs): Promise<Video> {
    return this._VideosService.getVideo(getVideoArgs);
  }

  @Mutation(() => Video)
  @Admin()
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  createVideo(
    @Args('input')
    input: VideoInput,
  ): Promise<Video> {
    return this._VideosService.createVideo(input);
  }

  @Mutation(() => Video)
  @Admin()
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  updateVideo(
    @Args('input')
    input: VideoInput,
  ): Promise<Video> {
    return this._VideosService.updateVideo(input);
  }

  @Mutation(() => Video, { nullable: true })
  @Admin()
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  deleteVideo(
    @Args('id')
    id: string,
  ): Promise<void> {
    return this._VideosService.deleteVideo(id);
  }
}
