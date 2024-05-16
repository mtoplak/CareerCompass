import { Schema, Document, Model, model } from 'mongoose';
import { User } from './user.model';

export const ChatHistorySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  chat_history: [
    {
      role: { type: String, required: false },
      content: { type: String, required: false },
    },
  ],
});

export interface ChatHistory extends Document {
  user: User;
  chat_history: { role: string; content: string }[];
}

export const ChatHistoryModel: Model<ChatHistory> = model<ChatHistory>('ChatHistory', ChatHistorySchema);
