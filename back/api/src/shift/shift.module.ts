import { Module } from '@nestjs/common';
import { ShiftController } from './shift/shift.controller';

@Module({
  controllers: [ShiftController],
})
export class ShiftModule {}
