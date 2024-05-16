import { Schema, Document, Model, model } from 'mongoose';
import { Company } from './company.model';
import { InterviewExperience } from '../../enums/interview-experience.enum';
import { InterviewDifficulty } from '../../enums/interview-difficulty.enum';

export const RatingSchema = new Schema({
  company_slug: { type: Schema.Types.String, ref: 'Company', required: true },
  // general assessment
  team: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  personal_development: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  flexibility: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  work_life_balance: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  work_environment: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  leadership: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  general_assessment_comment: { type: String, required: false },
  // salary and benefits
  benefits: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  remote_work: { type: Boolean, required: true },
  bonuses: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  salary_and_benefits_comment: { type: String, required: false },
  // interviews
  experience: {
    type: String,
    required: true,
    enum: Object.values(InterviewExperience),
  },
  difficulty: {
    type: String,
    required: true,
    enum: Object.values(InterviewDifficulty),
  },
  interviews_comment: { type: String, required: false },
});

export interface Rating extends Document {
  company_slug: Company; // podjetje slug
  // splošna ocena
  team: number; // ekipa
  personal_development: number; // osebni razvoj
  flexibility: number; //fleksibilnost
  work_life_balance: number; // ravnovesje dela in življenja
  work_environment: number; // delovno vzdušje
  leadership: number; // vodstvo
  general_assessment_comment: string; // poljuben komentar
  // plače in ugodnosti
  benefits: number; // ugodnosti
  remote_work: boolean; // delo na daljavo
  bonuses: number; // bonusi
  salary_and_benefits_comment: string; // poljuben komentar
  // razgovori
  experience: InterviewExperience; // izkušnja z intervjujem
  difficulty: InterviewDifficulty; // težavnost
  interviews_comment: string; // poljuben komentar
}

export const RatingModel: Model<Rating> = model<Rating>('Rating', RatingSchema);