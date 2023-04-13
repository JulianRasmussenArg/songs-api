import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  artist: string;

  @Column('text', { array: true })
  lyrics: string[];
}
