import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { ReportModule } from './report/report.module';
import {TypeOrmModule} from "@nestjs/typeorm";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
      TaskModule, ReportModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
