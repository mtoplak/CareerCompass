import { Schema, Document, Model, model } from 'mongoose';
import { JobAdvertisement } from './job-advertisement.model';

export const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    saved_advertisements: [{ type: Schema.Types.ObjectId, ref: 'JobAdvertisement' }],
});

export interface User extends Document {
    name: string; // ime
    email: string; // email
    saved_advertisements: JobAdvertisement[]; // shranjeni_oglasi
}

export const UserModel: Model<User> = model<User>('User', UserSchema);
