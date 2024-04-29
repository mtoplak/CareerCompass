import { Schema, Document, Model, model } from 'mongoose';
import { Industry } from 'src/enums/industry.enum';

export const CompanySchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  logo: { type: String, required: true },
  slug: { type: String, required: true },
  website: { type: String, required: false },
  industry: [{
    type: String,
    required: true,
    enum: Object.values(Industry),
  }],
  email: { type: String, required: false, lowercase: true },
  claimed: { type: Boolean, required: true, default: false },
  // rating
  avg_rating: { type: Number, default: 0 },
  ratings_count: { type: Number, default: 0 },
  avg_team: { type: Number },
  avg_personal_development: { type: Number },
  avg_flexibility: { type: Number },
  avg_work_life_balance: { type: Number },
  avg_work_enviroment: { type: Number },
  avg_leadership: { type: Number },
  avg_benefits: { type: Number },
  avg_bonuses: { type: Number },
});

export interface Company extends Document {
  name: string, // naziv
  address: string, // naslov
  city: string, // kraj
  logo: string, // logo
  slug: string, // slug
  website: string, // spletna stran
  industry: Industry[], // panoga
  email: string, // email
  claimed: boolean, // potrjeno
  avg_rating: number, // povprečna ocena
  ratings_count: number, // stevilo ocen
  avg_team: number,
  avg_personal_development: number,
  avg_flexibility: number,
  avg_work_life_balance: number,
  avg_work_enviroment: number,
  avg_leadership: number,
  avg_benefits: number,
  avg_bonuses: number;
}

export const CompanyModel: Model<Company> = model<Company>('Company', CompanySchema);
