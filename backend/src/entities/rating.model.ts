import { Schema, Document, Model, model } from 'mongoose';
import { Company } from './company.model';

export const RatingSchema = new Schema({
  company: [{ type: Schema.Types.ObjectId, ref: 'Company' }],
  // general assessment
  team: { type: String },
  personal_development: { type: String },
  flexibility: { type: String },
  work_life_balance: { type: String },
  work_enviroment: { type: String },
  leadership: { type: String },
  general_assessment_comment: { type: String },
  // salary and benefits
  benefits: { type: String },
  remote_work: { type: String },
  bonuses: { type: String },
  salary_and_benefits_comment: { type: String },
  // interviews
  experience: { type: String },
  duration: { type: String },
  difficulty: { type: String }, // bomo dale to not? 
  interviews_comment: { type: String },
});

export interface Rating extends Document {
  company: Company; // podjetje
  // splošna ocena
  team: string; // ekipa
  personal_development: string; // osebni razvoj
  flexibility: string; //fleksibilnost
  work_life_balance: string; // ravnovesje dela in življenja
  work_enviroment: string; // delovno vzdušje
  leadership: string; // vodstvo
  general_assessment_comment: string; // poljuben komentar
  // plače in ugodnosti
  benefits: string; // ugodnosti
  remote_work: string; // delo na daljavo
  bonuses: string; // bonusi
  salary_and_benefits_comment: string; // poljuben komentar
  // razgovori
  experience: string; // izkušnja z intervjujem
  duration: string; // trajanje postopka
  difficulty: string; // težavnost
  interviews_comment: string; // poljuben komentar
}

export const RatingModel: Model<Rating> = model<Rating>('Rating', RatingSchema);
