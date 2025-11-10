import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ParseIntPipe } from 'src/common/pipes/parse-int/parse-int.pipe';
import { ActiveUser } from 'src/iam/decorators/active-user.decorator';
import type { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@ApiTags('coffees')
@UsePipes(ValidationPipe)
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Public()
  @UsePipes(ValidationPipe)
  @Get()
  findAll(
    @ActiveUser() user: ActiveUserData,
    @Protocol('https') protocol,
    @Query() paginationQueryDto: PaginationQueryDto,
  ): Promise<Coffee[]> {
    console.log('User: ', user);
    console.log('Protocol: ', protocol);
    return this.coffeesService.findAll(paginationQueryDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<Coffee> {
    return await this.coffeesService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto,
  ): Promise<Coffee> {
    return await this.coffeesService.update(+id, updateCoffeeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Coffee> {
    return await this.coffeesService.remove(+id);
  }
}
