import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  brand: string;

  @IsString({ each: true })
  @IsOptional()
  flavors: string[];
}
