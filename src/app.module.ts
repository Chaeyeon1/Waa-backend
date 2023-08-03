import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { UsersModule } from './users/users.module';
import { CounselingModule } from './counseling/counseling.module';
import { TwentyQuestionModule } from './twenty-question/twenty-question.module';
import { WordChainModule } from './word-chain/word-chain.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TodoModule,
    UsersModule,
    CounselingModule,
    TwentyQuestionModule,
    WordChainModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
