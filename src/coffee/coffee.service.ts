import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FlavorEntity } from './entities/flavor.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto/pagination-query.dto';
import { DataSource, Repository } from 'typeorm';
import { Event } from '../events/entities/event.entity/event.entity';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(FlavorEntity)
    private readonly flavourRepository: Repository<FlavorEntity>,
    private readonly dataSource: DataSource,
  ) {
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map(name => this.preloadFlavourByName(name)),
    );

    const coffee = this.coffeeRepository.create({ ...createCoffeeDto, flavors });
    return await this.coffeeRepository.save(coffee);
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return await this.coffeeRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne({ where: { id }, relations: ['flavors'] });
    if (!coffee) throw new NotFoundException(`Coffee with #${id} not found!`);
    return coffee;
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors = updateCoffeeDto.flavors &&
      (await Promise.all(updateCoffeeDto.flavors.map(name => this.preloadFlavourByName(name))));

    const coffee = await this.coffeeRepository.preload({ id, ...updateCoffeeDto, flavors });
    if (!coffee) throw new NotFoundException(`Coffee with #${id} not found!`);
    return await this.coffeeRepository.save(coffee);
  }

  async remove(id: number) {
    const foundCoffee = await this.findOne(id);
    return await this.coffeeRepository.remove(foundCoffee);
  }

  async preloadFlavourByName(name: string) {
    const existingFlavor = await this.flavourRepository.findOneBy({ name });
    if (existingFlavor) return existingFlavor;

    return this.flavourRepository.create({ name });
  }

  // transactions
  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      coffee.recommendations++;
      const recommendEvent = new Event();
      recommendEvent.name = 'recommended_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };
      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);
      await queryRunner.commitTransaction();
    } catch (e: unknown) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
