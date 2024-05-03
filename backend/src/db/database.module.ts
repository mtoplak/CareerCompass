import { Module, OnModuleInit } from '@nestjs/common';
import * as mongoose from 'mongoose';

@Module({})
export class DatabaseModule implements OnModuleInit {
    onModuleInit() {
        this.ensureIndexes();
    }

    private async ensureIndexes() {
        try {
            await mongoose.connect(`${process.env.MONGODB_URI}`);
            const companyModel = mongoose.model('Company');
            await companyModel.createIndexes();
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    }
}
