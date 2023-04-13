import {
  Controller,
  Get,
  Headers,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SongService } from '../song/song.service';

@Controller()
export class SongInfoController {
  constructor(private readonly songService: SongService) {}

  @Get('/song-info/:songsAmount')
  async getSongInfo(
    @Headers('appKey') appKey: string,
    @Param('songsAmount') songsAmount: number,
  ): Promise<any> {
    if (appKey !== 'YOUR_APP_KEY') {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const songInfo = await this.songService.getSongInfo(songsAmount);

    return songInfo;
  }
}
