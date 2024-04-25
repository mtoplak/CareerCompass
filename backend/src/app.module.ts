import { Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { NotesModule } from './notes/notes.module'
import { CompanyModule } from './company/company.module'
import { UserModule } from './user/user.module'
import { JobAdvertisementModule } from './job advertisement/job-advertisement.module'
import { RatingModule } from './rating/rating.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.MONGODB_URI}`),
    NotesModule,
    CompanyModule,
    UserModule,
    JobAdvertisementModule,
    RatingModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure() { }
}
