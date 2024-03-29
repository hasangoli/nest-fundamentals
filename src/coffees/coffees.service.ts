import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity';
import { Connection, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly connection: Connection,
    private readonly configService: ConfigService,
  ) {
    const databaseHost: string =
      this.configService.get<string>('DATABASE_USER');
    console.log(databaseHost);
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor: Flavor = await this.flavorRepository.findOne({
      where: { name },
    });

    if (existingFlavor) return existingFlavor;

    return this.flavorRepository.create({ name });
  }

  async recommendCoffee(coffee: Coffee): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      coffee.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    const flavors: Flavor[] = await Promise.all(
      createCoffeeDto.flavors.map(
        (flavor: string): Promise<Flavor> => this.preloadFlavorByName(flavor),
      ),
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });

    return this.coffeeRepository.save(coffee);
  }

  async findAll(paginationQueryDto: PaginationQueryDto): Promise<Coffee[]> {
    const { limit, offset } = paginationQueryDto;

    const coffees: Coffee[] = await this.coffeeRepository.find({
      relations: { flavors: true },
      skip: offset,
      take: limit,
    });

    return coffees;
  }

  async findOne(id: string): Promise<Coffee> {
    const coffee = await this.coffeeRepository.findOne({
      where: { id: +id },
      relations: { flavors: true },
    });

    if (!coffee)
      throw new NotFoundException(`Coffee with the id of ${id} not found`);

    return coffee;
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto): Promise<Coffee> {
    const flavors: Flavor[] =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map(
          (flavor: string): Promise<Flavor> => this.preloadFlavorByName(flavor),
        ),
      ));

    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });

    if (!coffee)
      throw new NotFoundException(`Coffee with the id of ${id} not found`);

    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string): Promise<Coffee> {
    const coffee = await this.coffeeRepository.findOne({ where: { id: +id } });

    if (!coffee)
      throw new NotFoundException(`Coffee with the id of ${id} not found`);

    return this.coffeeRepository.remove(coffee);
  }
}
