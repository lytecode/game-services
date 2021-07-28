import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { GamesService } from './games.service'


describe('Games service', () => {
  let testingModule: TestingModule;
  let gamesService: GamesService;

  const mockGame = { 
    title: "Resident Evil", 
    price: 4000, 
    tags: ['Capcom', 'Adventure'], 
    releaseDate: new Date('01/21/2018'), 
    publisher: {  id: 1, name: "Capcom", siret: 310, phone: "08123399933239"}
  };
  
  beforeEach(async () => {
        testingModule = await Test.createTestingModule({
        providers: [
            {
                provide: GamesService,
                useFactory: () => ({
                    getGames: jest.fn(() => true),
                    createGame: jest.fn(() => true),
                    getGameById: jest.fn(() => true),
                    updateGame: jest.fn(() => true),
                    deleteGame: jest.fn(() => true),
                    getPublisher: jest.fn(() => true),
                    discountAndDeleteOldGames: jest.fn(() => true),
                })
            }
        ],
        }).compile();

        gamesService = testingModule.get(GamesService);
    });

    it('GamesService - should be defined', () => {
        expect(gamesService).toBeDefined();
    });

  describe('getGameById', () => {
    it('should call games service with id', async () => {
      const gameId = '123';
      await gamesService.getGameById(gameId);
      expect(gamesService.getGameById).toHaveBeenCalledWith(gameId);
    });
  });

  describe('getGames', () => {
    it('should call getGames method', async() => {
        await gamesService.getGames();
         expect(gamesService.getGames).toHaveBeenCalled();
    })
  })

  describe('createGame', () => {
    it('should call createGame method', async() => {
        await gamesService.createGame(mockGame);
        expect(gamesService.createGame).toHaveBeenCalled()
        expect(gamesService.createGame).toHaveBeenCalledWith(mockGame)
    })
  })

  describe('updateGame', () => {
    it('should call updateGame method', async() => {
        await gamesService.updateGame('12345', mockGame);
        expect(gamesService.updateGame).toHaveBeenCalled()
    })

    it('updateGame should be called with id and data', async() => {
        await gamesService.updateGame('12345', mockGame);
        expect(gamesService.updateGame).toBeCalledWith('12345', mockGame)
    })
  })

  describe('deleteGame', () => {
    it('should call deleteGame method', async() => {
        await gamesService.deleteGame('12345');
        expect(gamesService.deleteGame).toHaveBeenCalled()
    })
  })

  describe('getPublisher', () => {
    it('should call getPublisher of a Game', async() => {
        await gamesService.getPublisher('12345');
        expect(gamesService.getPublisher).toHaveBeenCalled()
    })
  })

  describe('discountAndDeleteOldGames', () => {
    it('should call discountAndDeleteOldGames', async() => {
        await gamesService.discountAndDeleteOldGames();
        expect(gamesService.discountAndDeleteOldGames).toHaveBeenCalled()
    })
  })
  

})