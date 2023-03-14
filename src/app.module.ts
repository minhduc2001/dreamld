import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// BASE
import { config } from '@/config';
import { LoggerModule } from '@base/logger/logger.module';
import { dbConfig } from '@base/db/db.config';
import { MailerModule } from '@base/mailer/mailer.module';

// APPS
import { UserModule } from '@/user/user.module';
import { AuthModule } from '@/auth/auth.module';
import { RoleModule } from '@/role/role.module';
import { ManagerDeviceModule } from '@/manager-device/manager-device.module';
import { TaleModule } from '@/tale/tale.module';
import { GenreModule } from '@/genre/genre.module';
import { AudioBookModule } from '@/audio-book/audio-book.module';
import { HistoryModule } from '@/history/history.module';
import { CommentModule } from '@/comment/comment.module';
import { PaymentModule } from '@/payment/payment.module';
import { LibraryModule } from '@/library/library.module';
import { AuthorModule } from '@/author/author.module';

// SHARED
import { SeedersModule } from '@shared/seeder/seeder.module';

const appModule = [
  AuthModule,
  UserModule,
  RoleModule,
  ManagerDeviceModule,
  TaleModule,
  GenreModule,
  AudioBookModule,
  HistoryModule,
  CommentModule,
  PaymentModule,
  LibraryModule,
  AuthorModule,
];
const baseModule = [LoggerModule];

@Module({
  imports: [
    ...baseModule,
    ...appModule,
    TypeOrmModule.forRoot(dbConfig),
    SeedersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
