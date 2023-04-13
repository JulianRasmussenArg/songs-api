import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Headers,
  ForbiddenException,
} from '@nestjs/common';
import { Player } from '../model/player.entity';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get('/score')
  async getLeaderboard(@Headers() headers): Promise<Player[]> {
    if (headers.appkey !== 'YOUR_APP_KEY') {
      throw new ForbiddenException();
    }
    return await this.playerService.getAllPlayers();
  }

  @Post('/score/:id')
  async updatePlayerScore(
    @Headers() headers,
    @Param('id') id: number,
    @Body('score') score: number,
  ): Promise<Player> {
    if (headers.appkey !== 'YOUR_APP_KEY') {
      throw new ForbiddenException();
    }
    return await this.playerService.updatePlayerScore(id, score);
  }
}
