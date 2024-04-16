import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

@Schema()
export class Note extends Document {
  @Prop({ default: uuidv4 })
  _id: string

  @Prop({ default: Date.now })
  created_at: Date

  @Prop({ default: new Date('1900-01-01T00:00:00.000Z') })
  updated_at: Date

  @Prop({ default: new Date('1900-01-01T00:00:00.000Z') })
  deleted_at: Date

  @Prop({ required: true })
  title: string

  @Prop({ default: '' })
  content: string

  @Prop()
  user_id: string
}

export const NoteSchema = SchemaFactory.createForClass(Note)
