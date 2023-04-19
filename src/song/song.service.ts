import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Song } from '../model/song.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
  ) {}

  async getSongs(songsAmount: number): Promise<Song[]> {
    const selectedSongs = await this.selectRandomSongs(songsAmount);

    const songsInfo = await Promise.all(
      selectedSongs.map(async (song) => {
        const lyrics = await this.getSongLyrics(song.name);
        return { ...song, lyrics };
      }),
    );

    return songsInfo;
  }

  private async selectRandomSongs(songsAmount: number): Promise<Song[]> {
    const randomSongs = await this.songRepository
      .createQueryBuilder()
      .orderBy('RAND()')
      .take(songsAmount)
      .getMany();

    return randomSongs;
  }

  private async getSongLyrics(songName: string): Promise<string[]> {
    const song = await this.songRepository.findOne({
      where: { name: songName },
    });
    if (!song) {
      throw new Error(`Song with ID ${songName} not found`);
    }
    return song.lyrics;
  }
}
