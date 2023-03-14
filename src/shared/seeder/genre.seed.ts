import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from '@/genre/genre.entity';

const genres = [
  {
    id: 1,
    name: 'Action',
  },
  {
    id: 2,
    name: 'Comedy',
  },
  {
    id: 3,
    name: 'Drama',
  },
  {
    id: 4,
    name: 'Horror',
  },
  {
    id: 5,
    name: 'Romance',
  },
];

export class GenreSeed {
  constructor(
    @InjectRepository(Genre)
    private readonly repository: Repository<Genre>,
  ) {}

  async seed() {
    const count = await this.repository.count();
    if (count) return;
    for (const genre of genres) {
      await this.repository.save(genre);
    }
  }
}
