import { Test, TestingModule } from '@nestjs/testing';
import { GamesController } from './games.controller';
import { GamesService } from  './games.service';

describe('GamesController', () => {
  let gameController: GamesController;

  const mockGamesService = {
    createGame: jest.fn(dto => {
      return {_id: '12345', ...dto}
    }),

    getGames: jest.fn(() => {
      return [];
    }),

    getGameById: jest.fn((id) => {
      return { 
        _id: id,
        title: "FIFA21",
        price: 5000,
        tags: ["FIFA", "FIFA21", "Soccer", "Football", "multiPlayer"],
        "releaseDate": new Date(),
        publisher: { 
          id: 1, 
          name: "Konami", 
          siret: 44444, 
          phone: "08123399933239"
        }
      }
    }),

    updateGame: jest.fn(( title, price, tags, releaseDate, publisher) => {
      return { title, price, tags, releaseDate, publisher}
    }),

    deleteGame: jest.fn((id) => {
      return {message: 'Deleted Successfully'}
    }),

    getPublisher: jest.fn((id) => {
      return ({id: 1, name: 'Konami' , siret: 777, phone: "08123399933239"})
    }),

    discountAndDeleteOldGames: jest.fn(() => {
      return 'Request processed successfully"'
    })
  
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GamesController],
      providers: [GamesService],
    }).overrideProvider(GamesService).useValue(mockGamesService).compile();

    gameController = app.get<GamesController>(GamesController);
  });

  it('should be defined', async() => {
    expect(gameController).toBeDefined()
  });

  describe('Create Game', () => {
    it('should add a game', async () => {
        const dto = { title: "Resident Evil III",price: 5000, tags: ['Capcom', 'Adventure'], releaseDate: new Date('01/21/2018'), publisher: {  id: 1, name: "Capcom", siret: 310, phone: "08123399933239"} }
      expect(await gameController.createGame(dto)
       ).toEqual({ 
        _id: '12345',
        ...dto
      })
    })
  })
  
  describe('Fetch all games', () => {
    it('should return empty array if there is no game', async() => {
      const games = await gameController.getGames();
      expect(games).toEqual([])
    })
  })
  
  describe('Get a single Game', () => {
    it("should fetch a single game object", async() => {
      const game = await gameController.getGame('12345');
      const expected = { 
        _id: '12345',
        title: "FIFA21",
        price: 5000,
        tags: ["FIFA", "FIFA21", "Soccer", "Football", "multiPlayer"],
        "releaseDate": new Date(),
        publisher: { 
          id: 1, 
          name: "Konami", 
          siret: 44444, 
          phone: "08123399933239"
        }
      };
      expect(game).toEqual(expected)
    })
  }) 
  
//   describe("Update Game", () => {
//     it("should update a single Game", async() => {
//       const expected = { 
//         id: '12345',
//         title: "Resident Evil", 
//         price: 4000, 
//         tags: ['Capcom', 'Adventure'], 
//         releaseDate: new Date('01/21/2018'), 
//         publisher: {  id: 1, name: "Capcom", siret: 310, phone: "08123399933239"}
//       };
//       const updated = await gameController.updateGame('12345', { title: "Resident Evil",price: 4000,tags: ['Capcom', 'Adventure'], releaseDate: new Date('01/21/2018'), publisher: {  id: 1, name: "Capcom", siret: 310, phone: "08123399933239"} })
//       expect(updated).toMatchObject(expected)
//     })
//   })

  describe('Delete game', () => {
    it('should delete a game', async() => {
      expect(await gameController.deleteGame('123')).toMatchObject({message: 'Deleted Successfully'})
    })
  })

  describe('Get publisher', () => {
    it("should return publisher's details", async() => {
      const publisher = {id: 1, name: 'Konami' , siret: 777, phone: "08123399933239"};
      expect(await gameController.getPublisher('12345')).toEqual(publisher)
    })
  })

  describe('Old Games', () => {
    it("should discount and delete old games", async() => {
      expect(await gameController.discountAndDeleteOldGames()).toBe('Request processed successfully"')
    })
  })
});
