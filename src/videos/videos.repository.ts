import { EntityRepository, Repository } from 'typeorm';

import { Video } from './videos.entity';

@EntityRepository(Video)
export class VideoRepository extends Repository<Video> {}
