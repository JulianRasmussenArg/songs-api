import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongController } from './song/song.controller';
import { SongService } from './song/song.service';
import { PlayerService } from './player/player.service';
import { PlayerController } from './player/player.controller';
import { Song } from './model/song.entity';
import { Player } from './model/player.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Song]),
    TypeOrmModule.forFeature([Player]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '137.184.76.157',
      port: 3306,
      username: 'remote_user',
      password: '2023Hackathon@',
      database: 'hackathon',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController, SongController, PlayerController],
  providers: [AppService, SongService, PlayerService],
})
export class AppModule {}
