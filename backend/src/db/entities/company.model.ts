import { Schema, Document, Model, model } from 'mongoose';
import { Industry } from '../../enums/industry.enum';

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
  subindustry: [{ type: String, required: true }],
  email: { type: String, required: false, lowercase: true },
  claimed: { type: Boolean, required: true, default: false },
  // rating
  avg_rating: { type: Number, default: 0, index: true },
  ratings_count: { type: Number, default: 0 },
  avg_team: { type: Number, default: 0 },
  avg_personal_development: { type: Number, default: 0 },
  avg_flexibility: { type: Number, default: 0 },
  avg_work_life_balance: { type: Number, default: 0 },
  avg_work_environment: { type: Number, default: 0 },
  avg_leadership: { type: Number, default: 0 },
  avg_benefits: { type: Number, default: 0 },
  avg_bonuses: { type: Number, default: 0 },
  general_assessment_comments: [{ type: String }],
  salary_and_benefits_comments: [{ type: String }],
  interviews_comments: [{ type: String }],
  avg_duration: [{ type: String }],
  remote_work_distribution: {
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 }
  },
  remote_work_percentage: {
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
  },
  experience_distribution: {
    pozitivna: { type: Number, default: 0 },
    nevtralna: { type: Number, default: 0 },
    negativna: { type: Number, default: 0 }
  },
  experience_percentage: {
    pozitivna: { type: Number, default: 0 },
    nevtralna: { type: Number, default: 0 },
    negativna: { type: Number, default: 0 },
  },
  difficulty_distribution: {
    enostavno: { type: Number, default: 0 },
    srednje: { type: Number, default: 0 },
    težko: { type: Number, default: 0 }
  },
  difficulty_percentage: {
    enostavno: { type: Number, default: 0 },
    srednje: { type: Number, default: 0 },
    težko: { type: Number, default: 0 },
  }
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
  avg_rating: number, // povprečna ocena
  ratings_count: number, // stevilo ocen
  avg_team: number,
  avg_personal_development: number,
  avg_flexibility: number,
  avg_work_life_balance: number,
  avg_work_environment: number,
  avg_leadership: number,
  avg_benefits: number,
  avg_bonuses: number,
  avg_duration: string[],
  general_assessment_comments: string[],
  salary_and_benefits_comments: string[],
  interviews_comments: string[],
  remote_work_distribution: {
    yes: number,
    no: number,
  },
  remote_work_percentage: {
    yes: number,
    no: number,
  },
  experience_distribution: {
    pozitivna: number,
    nevtralna: number,
    negativna: number,
  },
  experience_percentage: {
    pozitivna: number,
    nevtralna: number,
    negativna: number,
  },
  difficulty_distribution: {
    enostavno: number,
    srednje: number,
    težko: number,
  },
  difficulty_percentage: {
    enostavno: number,
    srednje: number,
    težko: number,
  },
}

export const CompanyModel: Model<Company> = model<Company>('Company', CompanySchema);
