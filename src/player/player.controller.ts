import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Headers,
  ForbiddenException,
  Logger,
  Put,
} from '@nestjs/common';
import { Player } from '../model/player.entity';
import { PlayerService } from './player.service';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('player')
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new player' })
  @ApiHeader({
    name: 'appkey',
    description: 'appkey. The value is YOUR_APP_KEY for the moment',
  })
  @ApiBody({ type: Player })
  @ApiResponse({ status: 201, type: Player })
  async create(
    @Body() createPlayer: Player,
    @Headers() headers,
  ): Promise<Player> {
    if (headers.appkey !== 'YOUR_APP_KEY') {
      throw new ForbiddenException();
    }
    const player = await this.playerService.create(createPlayer);
    return player;
  }

  @Get('/score')
  @ApiOperation({ summary: 'Get all Players score' })
  @ApiHeader({
    name: 'appkey',
    description: 'appkey. The value is YOUR_APP_KEY for the moment',
  })
  @ApiResponse({ status: 200, type: [Player] })
  async getLeaderboard(@Headers() headers): Promise<Player[]> {
    if (headers.appkey !== 'YOUR_APP_KEY') {
      throw new ForbiddenException();
    }
    return await this.playerService.getAllPlayers();
  }

  @Put('/score/')
  @ApiOperation({ summary: 'Update player score' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiHeader({
    name: 'appkey',
    description: 'appkey. The value is YOUR_APP_KEY for the moment',
  })
  @ApiResponse({ status: 200, type: Player })
  async updatePlayerScore(
    @Headers() headers,
    @Body('id') id: string,
    @Body('score') score: number,
  ): Promise<Player> {
    if (headers.appkey !== 'YOUR_APP_KEY') {
      throw new ForbiddenException();
    }
    return await this.playerService.updatePlayerScore(id, score);
  }
}
