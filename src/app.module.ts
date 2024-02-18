import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-delicate-pine-a58ibk4a-pooler.us-east-2.aws.neon.tech',
      port: 5432,
      username: 'hasangoli',
      password: 'Qwrsp1XvDda7',
      database: 'coffees',
      autoLoadEntities: true,
      synchronize: true,
      ssl: true,
    }),
    CoffeeRatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
