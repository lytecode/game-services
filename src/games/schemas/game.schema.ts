import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GameDocument = Game & Document;

@Schema()
export class Game {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: [String], required: true })
  tags: string[];

  @Prop({ required: true })
  releaseDate: Date

  @Prop(raw({
    id: { type: Number, required: true},
    name: { type: String, required: true},
    siret: { type: Number, required: true},
    phone: { type: String, required: true}
  }))
  publisher
}

export const GameSchema = SchemaFactory.createForClass(Game);