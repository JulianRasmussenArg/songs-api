import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongInfoController } from './song/song-info.controller';
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
      host: 'localhost',
      port: 3306,
      username: 'your-username',
      password: 'your-password',
      database: 'your-database-name',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController, SongInfoController, PlayerController],
  providers: [AppService, SongService, PlayerService],
})
export class AppModule {}
