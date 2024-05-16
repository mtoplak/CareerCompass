import { Schema, Document, Model, model } from 'mongoose';
import { JobAdvertisement } from './job-advertisement.model';
import { Company } from './company.model';

export const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: false, default: null },
    saved_advertisements: [{ type: Schema.Types.ObjectId, ref: 'JobAdvertisement' }],
});

export interface User extends Document {
    name: string; // ime
    email: string; // email
    company: Company; // podjetje
    saved_advertisements: JobAdvertisement[]; // shranjeni_oglasi
}

export const UserModel: Model<User> = model<User>('User', UserSchema);
