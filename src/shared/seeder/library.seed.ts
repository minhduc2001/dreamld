import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Library } from '@/library/entities/library.entity';
import { User } from '@/user/entities/user.entity';

const library = [
  {
    id: 1,
    name: 'Yêu thích',
  },
  {
    id: 2,
    name: 'Theo dõi',
  },
];

export class LibrarySeed {
  constructor(
    @InjectRepository(Library)
    private readonly repository: Repository<Library>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seed() {
    const count = await this.repository.count();
    if (count) return;
    const users = await this.userRepository.find();

    for (const user of users) {
      for (const lib of library) {
        await this.repository.save({
          ...lib,
          user: user,
        });
      }
    }
  }
}
