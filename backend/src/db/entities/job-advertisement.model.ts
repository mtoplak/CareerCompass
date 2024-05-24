import { Schema, Document, Model, model } from 'mongoose';
import { Company } from './company.model';

export const JobAdvertisementSchema = new Schema({
  position: { type: String, required: true },
  description: { type: String, required: false },
  city: { type: String, required: false },
  company_linked: { type: Schema.Types.ObjectId, ref: 'Company' },
  company: { type: String },
  url: { type: String, required: false },
  source: { type: String, required: false },
  application: { type: String, required: false }
});

export interface JobAdvertisement extends Document {
  position: string; // delovno mesto
  description: string; // opis
  city: string; // kraj
  company_linked: Company; // podjetje
  company: string; // podjetje
  url: string; // url do oglasa
  source: string; // vir
  application: string; // nacin prijave
}

export const JobAdvertisementModel: Model<JobAdvertisement> = model<JobAdvertisement>('JobAdvertisement', JobAdvertisementSchema);
