import { Module } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CoffeeController } from './coffee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { FlavorEntity } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, FlavorEntity, Event])],
  controllers: [ CoffeeController],
  providers: [CoffeeService],
})
export class CoffeeModule {}
