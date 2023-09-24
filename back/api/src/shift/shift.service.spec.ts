import { Test, TestingModule } from '@nestjs/testing';
import { DynamodbModule } from '../dynamodb/dynamodb.module';
import { ShiftService } from './shift.service';
import { shift } from 'types-module';
import { addDays, format } from 'date-fns';

describe('ShiftService', () => {
  let service: ShiftService;
  const names = ['sato', 'kishimoto', 'yamada', 'Ohtani'];
  const partitions = ['X', 'Y', 'Z', 'A', 'B', 'C', 'D'];
  const Day = new Date('2022-05-01');
  const Daymount = 3;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DynamodbModule],
      providers: [ShiftService],
    }).compile();

    service = module.get<ShiftService>(ShiftService);
  });

  it('test WriteSchedule', () => {
    const shifts: shift[] = [];
    for (let ct = 0; ct < Daymount; ct++) {
      const stDay = addDays(Day, ct);
      partitions.forEach((partition) => {
        shifts.push({
          partition: format(stDay, 'yyyy-MM-dd') + '-' + partition,
          persons: names,
          delete: false,
        });
      });
    }

    const result = service.WriteSchedule(shifts);
    expect(result).toBeDefined();
    // metadata.httpStatusCode < 400
  });

  it('test GetSchedule', () => {
    const stday = format(Day, 'yyyy-MM-dd') + '-A';
    const fiday = format(addDays(Day, Daymount), 'yyyy-MM-dd') + '-Z';

    const result = service.GetSchedule(stday, fiday);
    expect(result).toBeDefined();
  });

  it('test GetYoursShifts', () => {
    const stday = format(Day, 'yyyy-MM-dd') + '-A';
    const fiday = format(addDays(Day, Daymount), 'yyyy-MM-dd') + '-Z';

    const result = service.GetYoursShifts(
      ['sato', 'kishimoto', 'yamada'],
      stday,
      fiday,
    );
    expect(result).toBeDefined();
  });
});
