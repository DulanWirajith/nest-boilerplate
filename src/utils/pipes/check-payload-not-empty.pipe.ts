import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CheckPayloadNotEmptyPipe implements PipeTransform {
  transform(payload: any): any {
    if (
      payload === null ||
      payload === undefined ||
      !Object.keys(payload).length
    ) {
      throw new BadRequestException('Payload should not be empty');
    }

    return payload;
  }
}
