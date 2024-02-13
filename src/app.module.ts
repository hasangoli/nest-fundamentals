import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-red-fire-a2kbykq5-pooler.eu-central-1.aws.neon.tech',
      port: 5432,
      username: 'hasangoli',
      password: '5qux1eTNVgvS',
      database: 'coffees',
      autoLoadEntities: true,
      synchronize: true,
      ssl: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// psql 'postgresql://hasangoli:5qux1eTNVgvS@ep-red-fire-a2kbykq5-pooler.eu-central-1.aws.neon.tech/coffees?sslmode=require'
