export class CreateGameDto {
    title: string; 
    price: number;
    tags: string[];
    releaseDate:Date;
    publisher: {
        id: number,
        name: string, 
        siret: number, 
        phone: string
    }; 
}