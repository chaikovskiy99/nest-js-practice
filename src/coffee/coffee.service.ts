import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = this.coffeeRepository.create(createCoffeeDto);
    return await this.coffeeRepository.save(coffee);
  }

  async findAll() {
    return await this.coffeeRepository.find();
  }

  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne({ where: { id } });
    if (!coffee) throw new NotFoundException(`Coffee with #${id} not found!`);
    return coffee;
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepository.preload({ id: id, ...updateCoffeeDto });
    if (!coffee) throw new NotFoundException(`Coffee with #${id} not found!`);
    await this.coffeeRepository.save(coffee);
  }

  async remove(id: number) {
    const foundCoffee = await this.findOne(id);
    return await this.coffeeRepository.remove(foundCoffee);
  }
}
