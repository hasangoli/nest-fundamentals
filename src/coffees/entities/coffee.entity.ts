import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @ManyToMany(
    (): typeof Flavor => Flavor,
    (flavor: Flavor): Coffee[] => flavor.coffees,
    { cascade: true },
  )
  @JoinTable()
  flavors: Flavor[];
}
