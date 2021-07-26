import { ApiProperty } from "@nestjs/swagger";

class PublisherProperties {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    siret: number
    @ApiProperty()
    phone: string
}
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
    publisher: PublisherProperties
}

