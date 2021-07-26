import { ApiProperty } from "@nestjs/swagger";

export class CreateGameDto {
    @ApiProperty()
    title: string;
    
    @ApiProperty()
    price: number;

    @ApiProperty()
    tags: string[];

    @ApiProperty()
    releaseDate: Date;

    @ApiProperty()
    publisher: {
        id: number,
        name: string, 
        siret: number, 
        phone: string
    }; 
}