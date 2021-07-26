import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GamesModule } from './games/games.module';

const URL = process.env.MONGO_URL || 'localhost';
@Module({
  imports: [GamesModule, MongooseModule.forRoot(`mongodb://${URL}:27017/games`)],
})
export class AppModule {}
