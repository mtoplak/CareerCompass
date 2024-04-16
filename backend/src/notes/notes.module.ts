import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { NotesService } from './notes.service'
import { NotesController } from './notes.controller'
import { Note, NoteSchema } from './entities/note.entity'
import { FirebaseAuthMiddleware } from '../middlewares/firebase-auth.middleware'

@Module({
  imports: [MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }])],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirebaseAuthMiddleware).forRoutes(NotesController)
  }
}
