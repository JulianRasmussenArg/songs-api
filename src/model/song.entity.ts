import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  artist: string;

  @Column('json')
  lyrics: string[];
}
