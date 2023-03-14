import { faker } from '@faker-js/faker';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '@/author/author.entity';

export class AuthorSeed {
  constructor(
    @InjectRepository(Author)
    private readonly repository: Repository<Author>,
  ) {}

  generate() {
    const data = [];
    for (let i = 0; i < 100; i++) {
      const author = {
        name: faker.name.fullName(),
        description:
          'Kitajima Tōru (北嶋 徹? born ngày 23 tháng 12 năm 1982 in Tokyo), còn được biết đến dưới nghệ danh TK hoặc TK from 凛として時雨, là ca sỹ chính kiêm guitar chính và là lãnh đạo của nhóm nhạc j-rock Ling Tosite Sigure. Vào năm 2012, TK tách khỏi nhóm (nhưng chưa giải thể) và làm việc dưới project solo TK from 凛として時雨, và ký hợp đồng với hãng đĩa Sony Music Entertainment Japan. TK cũng hợp tác với một số ca/nhạc sỹ và nhóm nhạc như Masayuki Nakano, cựu thành viên của nhóm BOOM BOOM SATELLITES',
      };
      if (data.includes(author)) continue;
      data.push(author);
    }
    return data;
  }

  async seed() {
    const count = await this.repository.count();
    if (count) return;
    const data = this.generate();
    for (const author of data) {
      await this.repository.save(author);
    }
  }
}
