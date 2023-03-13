import { faker } from '@faker-js/faker';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AudioBook } from '@/audio-book/entities/audio-book.entity';

export class AudioBookSeed {
  constructor(
    @InjectRepository(AudioBook)
    private readonly repository: Repository<AudioBook>,
  ) {}

  generate() {
    const data = [];

    for (let i = 0; i < 10; i++) {
      const audioBook = {
        accomplished: false,
        publicationDate: faker.date.birthdate(),
        title: faker.music.songName(),
        description: '',
      };
      data.push(audioBook);
    }
    return data;
  }
  async seed() {
    const count = await this.repository.count();
    if (count) return;
    const data = this.generate();
    for (const audioBook of data) {
      await this.repository.save(audioBook);
    }
  }
}
