import { Module } from '@nestjs/common';
import { ShiftController } from './shift.controller';
import { DynamodbModule } from '../dynamodb/dynamodb.module';
import { ClientService } from '../dynamodb/client/client.service';
import { ShiftService } from './shift.service';

@Module({
  imports: [DynamodbModule],
  controllers: [ShiftController],
  providers: [ClientService, ShiftService],
})
export class ShiftModule {}
