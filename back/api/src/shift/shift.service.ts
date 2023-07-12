import { Injectable } from '@nestjs/common';
import { ClientService } from '../dynamodb/client/client.service';

type Shift = {
  partition: string;
  userName: string;
};

type ShiftDto = {
  item: Shift;
  shouldAdd: boolean;
};

@Injectable()
export class ShiftService {
  constructor(private ClientService: ClientService) {}
  DLWeekFromMonday(monday: string) {}
  UploadShifts(shifts: ShiftDto[]) {
    const res = this.ClientService.WriteShifts(shifts);
    return;
  }
}
