import { Schema, Document, Model, model } from 'mongoose';
import { Company } from './company.model';

export const JobAdvertisementSchema = new Schema({
  position: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: false },
  city: { type: String, required: false },
  company_linked: [{ type: Schema.Types.ObjectId, ref: 'Company' }],
  company_nlinked: { type: String },
  hourly_rate: { type: String },
});

export interface JobAdvertisement extends Document {
  position: string; // delovno_mesto
  description: string; // opis
  address: string; // naslov
  city: string; // kraj
  company_linked: Company; // podjetje
  company_nlinked: string; // podjetje ne linkano
  hourly_rate: string; // urna_postavka
}

export const JobAdvertisementModel: Model<JobAdvertisement> = model<JobAdvertisement>('JobAdvertisement', JobAdvertisementSchema);
