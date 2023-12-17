import { Test, TestingModule } from '@nestjs/testing';
import { DynamodbModule } from '../dynamodb/dynamodb.module';
import { ShiftModule } from './shift.module';
import { ShiftController } from './shift.controller';
import { addDays, format } from 'date-fns';
import { shift } from 'types-module';

describe('ShiftController', () => {
  let controller: ShiftController;
  const names = ['sato', 'kishimoto', 'yamada', 'Ohtani'];
  const partitions = ['X', 'Y', 'Z', 'A', 'B', 'C', 'D'];
  const Day = new Date('2022-05-01');
  const Daymount = 3;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DynamodbModule, ShiftModule],
      controllers: [ShiftController],
    }).compile();

    controller = module.get<ShiftController>(ShiftController);
  });

  it('test GetSchedule', () => {
    const start = format(Day, 'yyyy-MM-dd') + '-A';
    const finish = format(addDays(Day, Daymount), 'yyyy-MM-dd') + '-Z';

    const result = controller.GetSchedule({
      start: start,
      finish: finish,
    });
    expect(result).toBeDefined();
    // metadata.httpStatusCode < 400
  });

  it('test WriteSchedule', () => {
    const shifts: shift[] = [];
    for (let ct = 0; ct < Daymount; ct++) {
      const stDay = addDays(Day, ct);
      partitions.forEach((partition) => {
        shifts.push({
          part: format(stDay, 'yyyy-MM-dd') + '-' + partition,
          user_ids: names,
          delete: false,
        });
      });
    }
    const result = controller.WriteSchedule(shifts);
    expect(result).toBeDefined();
    // metadata.httpStatusCode < 400
  });
  /*
  it('test GetSchedule', () => {
    const stday = format(Day, 'yyyy-MM-dd') + '-A';
    const fiday = format(addDays(Day, Daymount), 'yyyy-MM-dd') + '-Z';

    const result = service.GetSchedule(stday, fiday);
    expect(result).toBeDefined();
    // metadata.httpStatusCode < 400
  });

  it('test GetYoursShifts', () => {
    const stday = format(Day, 'yyyy-MM-dd') + '-A';
    const fiday = format(addDays(Day, Daymount), 'yyyy-MM-dd') + '-Z';

    const result = service.GetYoursShifts(names.slice(0, 2), stday, fiday);
    expect(result).toBeDefined();
    // metadata.httpStatusCode < 400
  });
  */
});
