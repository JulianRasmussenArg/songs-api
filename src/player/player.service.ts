import { Injectable, Logger } from '@nestjs/common';
import { Player } from '../model/player.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async create(createPlayer: Player): Promise<Player> {
    Logger.log('player', createPlayer);
    const player = new Player();
    player.name = createPlayer.name;
    player.password = createPlayer.password;
    player.email = createPlayer.email;
    player.score = createPlayer.score || 0;
    return this.playerRepository.save(player);
  }

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
