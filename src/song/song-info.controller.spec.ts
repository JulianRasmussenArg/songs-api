import { Test, TestingModule } from '@nestjs/testing';
import { SongInfoController } from './song-info.controller';

describe('SongInfoController', () => {
  let controller: SongInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongInfoController],
    }).compile();

    controller = module.get<SongInfoController>(SongInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
