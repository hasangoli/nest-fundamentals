import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'The name of the coffee' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ description: 'The brand of the coffee' })
  @IsString()
  @MinLength(1)
  brand: string;

  @ApiProperty({ example: [] })
  @IsString({ each: true })
  @IsOptional()
  flavors: string[];
}
