import { Schema, Document, Model, model } from 'mongoose';
import { Company } from './company.model';
import { InterviewExperience } from 'src/enums/interview-experience.enum';
import { InterviewDifficulty } from 'src/enums/interview-difficulty.enum';

export const RatingSchema = new Schema({
  company: [{ type: Schema.Types.ObjectId, ref: 'Company', required: true }],
  // general assessment
  team: {
    type: Number,
    min: 1,
    max: 5,
    required: false,
  },
  personal_development: {
    type: Number,
    min: 1,
    max: 5,
    required: false,
  },
  flexibility: {
    type: Number,
    min: 1,
    max: 5,
    required: false,
  },
  work_life_balance: {
    type: Number,
    min: 1,
    max: 5,
    required: false,
  },
  work_environment: {
    type: Number,
    min: 1,
    max: 5,
    required: false,
  },
  leadership: {
    type: Number,
    min: 1,
    max: 5,
    required: false,
  },
  general_assessment_comment: { type: String, required: false },
  // salary and benefits
  benefits: {
    type: Number,
    min: 1,
    max: 5,
    required: false,
  },
  remote_work: { type: Boolean },
  bonuses: {
    type: Number,
    min: 1,
    max: 5,
    required: false,
  },
  salary_and_benefits_comment: { type: String, required: false },
  // interviews
  experience: {
    type: String,
    required: false,
    enum: Object.values(InterviewExperience),
  },
  duration: { type: String },
  difficulty: {
    type: String,
    required: false,
    enum: Object.values(InterviewDifficulty),
  },
  interviews_comment: { type: String, required: false },
});

export interface Rating extends Document {
  company: Company; // podjetje
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
  duration: string; // trajanje postopka
  difficulty: InterviewDifficulty; // težavnost
  interviews_comment: string; // poljuben komentar
}

export const RatingModel: Model<Rating> = model<Rating>('Rating', RatingSchema);
