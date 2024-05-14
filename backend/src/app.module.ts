import { Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CompanyModule } from './modules/company/company.module'
import { UserModule } from './modules/user/user.module'
import { JobAdvertisementModule } from './modules/job-advertisement/job-advertisement.module'
import { RatingModule } from './modules/rating/rating.module'
import { DatabaseModule } from './db/database.module'
import { AiModule } from './modules/ai/ai.module'
import { AverageRatingModule } from './modules/average-rating/average-rating.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.MONGODB_URI}`),
    DatabaseModule,
    CompanyModule,
    UserModule,
    JobAdvertisementModule,
    RatingModule,
    AverageRatingModule,
    AiModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure() { }
}
