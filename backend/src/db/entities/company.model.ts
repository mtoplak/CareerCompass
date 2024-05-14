import { Schema, Document, Model, model } from 'mongoose';
import { Industry } from '../../enums/industry.enum';
import { AverageRating } from './average-rating.model';

export const CompanySchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  logo: { type: String, required: true },
  slug: { type: String, required: false },
  website: { type: String, required: false },
  industry: [{
    type: String,
    required: true,
    enum: Object.values(Industry),
  }],
  subindustry: [{ type: String, required: true }],
  email: { type: String, required: false, lowercase: true },
  claimed: { type: Boolean, required: true, default: false },
  average: { type: Schema.Types.ObjectId, ref: 'AverageRating', required: false },
});

export interface Company extends Document {
  name: string, // naziv
  address: string, // naslov
  city: string, // kraj
  logo: string, // logo
  slug: string, // slug
  website: string, // spletna stran
  industry: Industry[], // panoga
  subindustry: string[],
  email: string, // email
  claimed: boolean, // potrjeno
  average: AverageRating, // povprečna ocena
}

export const CompanyModel: Model<Company> = model<Company>('Company', CompanySchema);
