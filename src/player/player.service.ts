import { Injectable } from '@nestjs/common';
import { Player } from '../model/player.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async getAllPlayers(): Promise<Player[]> {
    return await this.playerRepository.find();
  }

  async updatePlayerScore(id: number, score: number): Promise<Player> {
    const player = await this.playerRepository.findOne({
      where: { id },
    });
    if (!player) {
      throw new Error('Player not found');
    }
    player.score = score;
    return player;
  }
}
