import { Schema, Document, Model, model } from 'mongoose';
import { Industry } from '../../enums/industry.enum';

export const CompanySchema = new Schema({
  name: { type: String, required: true, index: true },
  address: { type: String, required: true },
  city: { type: String, required: true, index: true },
  logo: { type: String, required: true },
  slug: { type: String, required: false },
  website: { type: String, required: false },
  industry: [{
    type: String,
    required: true,
    enum: Object.values(Industry),
    index: true
  }],
  subindustry: [{ type: String, required: true }],
  email: { type: String, required: false, lowercase: true },
  average: { type: Number, default: 0, required: false },
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
  average: number, // povprečna ocena
}

export const CompanyModel: Model<Company> = model<Company>('Company', CompanySchema);
