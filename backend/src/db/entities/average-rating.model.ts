import { Schema, Document, Model, model } from 'mongoose';
import { Company } from './company.model';

export const AverageRatingSchema = new Schema({
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
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

export interface AverageRating extends Document {
    company: Company;
    avg_rating: number,
    ratings_count: number,
    avg_team: number,
    avg_personal_development: number,
    avg_flexibility: number,
    avg_work_life_balance: number,
    avg_work_environment: number,
    avg_leadership: number,
    avg_benefits: number,
    avg_bonuses: number,
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

export const AverageRatingModel: Model<AverageRating> = model<AverageRating>('AverageRating', AverageRatingSchema);
