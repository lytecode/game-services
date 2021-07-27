import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsDate, IsNumber, IsString } from "class-validator";

class Publisher {
    @ApiProperty({ description: "id", required: true })
    @IsNumber()
    id: number;

    @ApiProperty({ description: "name", required: true })
    @IsString()
    name: string;

    @ApiProperty({ description: "siret", required: true })
    @IsNumber()
    siret: number

    @ApiProperty({ description: "phone", required: true })
    @IsString()
    phone: string
}
export class CreateGameDto {
    @ApiProperty({ description: 'title', required: true})
    @IsString()
    title: string;
    
    @ApiProperty({ description: 'price', required: true})
    @IsNumber()
    price: number;

    @ApiProperty({ description: 'tags', required: true})
    @IsArray()
    @ArrayMinSize(1)
    tags: string[];

    @ApiProperty({ description: 'releaseDate', required: true})
    @IsDate()
    releaseDate: Date;

    @ApiProperty()
    publisher: Publisher
}

