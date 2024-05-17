import { Schema, Document, Model, model } from 'mongoose';
import { Company } from './company.model';

export const JobAdvertisementSchema = new Schema({
  position: { type: String, required: true },
  description: { type: String, required: true },
  city: { type: String, required: false },
  company_linked: [{ type: Schema.Types.ObjectId, ref: 'Company' }],
  company: { type: String },
  salary: { type: String },
  url: { type: String, required: false },
  source: { type: String, required: false },
});

export interface JobAdvertisement extends Document {
  position: string; // delovno mesto
  description: string; // opis
  city: string; // kraj
  company_linked: Company; // podjetje
  company: string; // podjetje
  salary: string; // placa
  url: string; // url do oglasa
  source: string; // vir
}

export const JobAdvertisementModel: Model<JobAdvertisement> = model<JobAdvertisement>('JobAdvertisement', JobAdvertisementSchema);
