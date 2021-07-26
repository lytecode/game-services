import { ApiProperty } from "@nestjs/swagger";

class UpdateProperties {
    @ApiProperty({ required: false })
    id: number;
    @ApiProperty({ required: false })
    name: string;
    @ApiProperty({ required: false })
    siret: number
    @ApiProperty({ required: false })
    phone: string
}
export class UpdateGameDto {
    @ApiProperty({ required: false })
    title: string;
    
    @ApiProperty({ required: false })
    price: number;

    @ApiProperty({ required: false })
    tags: string[];

    @ApiProperty({ required: false })
    releaseDate: Date;

    @ApiProperty({ required: false })
    publisher: UpdateProperties
}

