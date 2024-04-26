import { Schema, Document, Model, model } from 'mongoose';
import { Industry } from 'src/enums/industry.enum';

export const CompanySchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  logo: { type: String, required: true },
  industry: [{
    type: String,
    required: true,
    enum: Object.values(Industry),
  }],
  email: { type: String, required: true, lowercase: true },
  claimed: { type: Boolean, required: true },
  avg_rating: { type: Number, default: 0 }
});

export interface Company extends Document {
  name: string; // naziv
  address: string; // naslov
  city: string; // kraj
  logo: string; // logo
  industry: Industry[]; // panoga
  email: string; // email
  claimed: boolean; // potrjeno
  avg_rating: number; // povprečna ocena
}

export const CompanyModel: Model<Company> = model<Company>('Company', CompanySchema);
