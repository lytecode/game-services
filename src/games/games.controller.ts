import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

import { Game } from './schemas/game.schema';
import { GamesService } from './games.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('games')
@Controller('/games')
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


}