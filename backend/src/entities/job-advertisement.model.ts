import { Schema, Document, Model, model } from 'mongoose';
import { Company } from './company.model';

export const JobAdvertisementSchema = new Schema({
  position: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  company: [{ type: Schema.Types.ObjectId, ref: 'Company' }],
  hourly_rate: { type: String },
});

export interface JobAdvertisement extends Document {
  position: string; // delovno_mesto
  description: string; // opis
  address: string; // naslov
  city: string; // kraj
  company: Company; // podjetje
  hourly_rate: string; // urna_postavka
}

export const JobAdvertisementModel: Model<JobAdvertisement> = model<JobAdvertisement>('JobAdvertisement', JobAdvertisementSchema);
