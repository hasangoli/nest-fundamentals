import { IsArray, IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  name: string;

  @IsString()
  brand: string;

  @IsArray()
  @IsString({ each: true })
  flavors: string[];
}
