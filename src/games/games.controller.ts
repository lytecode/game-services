import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

import { Game } from './schemas/game.schema';
import { GamesService } from './games.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('games')
@Controller('/api/v1/games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get(':id')
  async getGame(@Param('id') gameId: string): Promise<Game> {
    return this.gamesService.getGameById(gameId);
  }

  @Get()
  async getGames(): Promise<Game[]> {
    return this.gamesService.getGames();
  }

  @Post()
  async createGame(@Body() createGameDto: CreateGameDto): Promise<Game> {
    return this.gamesService.createGame(createGameDto)
  }

  @Patch(':id')
  async updateUser(@Param('id') gameId: string, @Body() updateGameDto: UpdateGameDto): Promise<Game> {
    return this.gamesService.updateGame(gameId, updateGameDto);
  }

  @Get(':id/publisher')
  async getPublisher(@Param('id') gameId: string): Promise<{id: number, name: string, siret: number, phone: string}> {
    return this.gamesService.getPublisher(gameId)
  }

}