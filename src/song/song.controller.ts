import {
  Controller,
  Get,
  Headers,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SongService } from './song.service';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Song } from '../model/song.entity';

@ApiTags('song')
@Controller()
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get('/song/:songsAmount')
  @ApiOperation({ summary: 'Get a random set of songs' })
  @ApiHeader({
    name: 'appkey',
    description: 'appkey. The value is YOUR_APP_KEY for the moment',
  })
  @ApiResponse({ status: 200, type: [Song] })
  async getSong(
    @Headers('appKey') appKey: string,
    @Param('songsAmount') songsAmount: number,
  ): Promise<any> {
    if (appKey !== 'YOUR_APP_KEY') {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const songs = await this.songService.getSongs(songsAmount);

    return songs;
  }
}
