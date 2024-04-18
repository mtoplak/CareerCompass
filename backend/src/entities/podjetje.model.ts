import { Schema, Document, Model, model } from 'mongoose';
import { Panoge } from 'src/enums/panoge.enum';

export const PodjetjeSchema = new Schema({
  naziv: { type: String, required: true },
  naslov: { type: String, required: true },
  kraj: { type: String, required: true },
  logo: { type: String, required: true },
  panoga: {
    type: String,
    required: true,
    enum: Object.values(Panoge),
  },
  email: { type: String, required: true, lowercase: true },
});

export interface Podjetje extends Document {
  naziv: string;
  naslov: string;
  kraj: string;
  logo: string;
  panoga: Panoge;
  email: string;
}

export const PodjetjeModel: Model<Podjetje> = model<Podjetje>('Podjetje', PodjetjeSchema);
