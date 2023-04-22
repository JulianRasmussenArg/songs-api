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
    const Findplayer = await this.playerRepository.findOneBy({
      email:  createPlayer.email,
    });
    if (!Findplayer) {
      const player = new Player();
      player.name = createPlayer.name;
      player.password = createPlayer.password;
      player.email = createPlayer.email;
      player.score = createPlayer.score || 0;
      return this.playerRepository.save(player);
    }else{
      return Findplayer
    }
    
  }

  async getAllPlayers(): Promise<Player[]> {
    return await this.playerRepository.find();
  }

  async updatePlayerScore(id: string, score: number): Promise<Player> {
    Logger.log('player', id);
    Logger.log('score', score);
    const player = await this.playerRepository.findOneBy({
      email:  id,
    });
    if (!player) {
      throw new Error('Player not found');
    }
    player.score = score;
    this.playerRepository.save(player);
    return player;
  }
}
