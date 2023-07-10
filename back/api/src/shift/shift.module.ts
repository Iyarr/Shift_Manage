import { Module } from '@nestjs/common';
import { ShiftController } from './shift/shift.controller';
import { DynamodbModule } from '../dynamodb/dynamodb.module';

@Module({
  imports: [DynamodbModule],
  controllers: [ShiftController],
})
export class ShiftModule {}
