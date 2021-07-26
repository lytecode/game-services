import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game, GameDocument } from './schemas/game.schema';
import { CreateGameDto } from './dto/create-game.dto';
import { BadRequestException } from '@nestjs/common';
import { UpdateGameDto } from './dto/update-game.dto';

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
    return await this.gameModel.find().exec();
  }

  async updateGame(gameId: string, gameUpdates: UpdateGameDto): Promise<Game> {
    const { title, price, tags, releaseDate, publisher } = gameUpdates;
    
    let updateGame;
    try {
      updateGame = await this.gameModel.findById(gameId);
    }catch (error) {
      throw new NotFoundException('No game found');
    }

    if (title) updateGame.title = title;
    if (price) updateGame.price = price;
    if (tags) updateGame.tags = tags;
    if (releaseDate) updateGame.releaseDate = releaseDate;
    if(publisher?.id) updateGame.publisher.id = publisher.id;
    if(publisher?.name) updateGame.publisher.id = publisher.name;
    if(publisher?.siret) updateGame.publisher.id = publisher.siret;
    if(publisher?.phone) updateGame.publisher.id = publisher.phone;

    return updateGame.save();
  }

  async getPublisher(gameId: string): Promise<{id: number, name: string, siret: number, phone: string}>{
    try {
      const { publisher } = await this.gameModel.findById(gameId);
      return publisher
    } catch (error) {
      throw new BadRequestException('Cannot find game or publisher with the given id')
    }
    
  }
}