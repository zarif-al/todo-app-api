import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { join } from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile:
        process.env.NODE_ENV == 'production' ? false : join(process.cwd(), 'src/schema.gql'),
      introspection: true,
      playground: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      dbName: process.env.MONGO_DB_NAME,
    }),
    UserModule,
  ],
})
export default class AppModule {}
