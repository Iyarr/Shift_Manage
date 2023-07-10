import { Module } from '@nestjs/common';
import { ShiftController } from './shift/shift.controller';
import { DynamodbModule } from '../dynamodb/dynamodb.module';
import { ClientService } from '../dynamodb/client/client.service';

@Module({
  imports: [DynamodbModule],
  controllers: [ShiftController],
  providers: [ClientService],
})
export class ShiftModule {}
