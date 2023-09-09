import { Module } from '@nestjs/common';
import { DynamodbModule } from '../dynamodb/dynamodb.module';
import { ShiftController } from './shift.controller';
import { ShiftService } from './shift.service';

@Module({
  imports: [DynamodbModule],
  controllers: [ShiftController],
  providers: [ShiftService],
})
export class ShiftModule {}
