import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { TaskStatus } from '../tasks.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];
  private validateStatus(value) {
    return this.allowedStatus.includes(value.toUpperCase());
  }
  transform(value: any, metadata: ArgumentMetadata) {
    const valid = this.validateStatus(value);
    if (!valid) {
      throw new BadRequestException('Invalid status type.');
    }
    return value;
  }
}
