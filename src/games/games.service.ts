import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game, GameDocument } from './schemas/game.schema';
import { CreateGameDto } from './dto/create-game.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class GamesService {
  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {}

  async getGameById(gameId: string): Promise<Game> {
    try{ 
      return await this.gameModel.findById(gameId).exec();
    } catch (error) {
      throw new NotFoundException('No game found');
    }
  }

  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    const { title, price, tags, releaseDate, publisher } = createGameDto;
    if (!title || !price || !tags || !releaseDate || !publisher?.id || !publisher?.name || !publisher?.siret || !publisher?.phone) throw new BadRequestException('All fields are required')
    
    const createdGame = new this.gameModel(createGameDto);
    return createdGame.save();
  }

  async getGames(): Promise<Game[]> {
    return this.gameModel.find().exec();
  }
}