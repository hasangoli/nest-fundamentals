import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index(['name', 'type']) // to speed up data retrieval
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Index() // to speed up data retrieval
  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;
}
