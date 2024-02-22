import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val: number = parseInt(value, 10);

    if (isNaN(val))
      throw new BadRequestException(
        `Validation Failed. "${val}" is not an integer!`,
      );

    return val;
  }
}
