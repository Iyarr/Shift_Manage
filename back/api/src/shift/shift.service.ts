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
  SubmitRequestFromMonday(monday: string) {
    // 日にちデータを文字列として指定
    const partitions = ['X', 'Y', 'Z', 'A', 'B', 'C', 'D'];
    const weeklypartitions: string[] = [];

    for (
      let mdate = new Date(monday);
      mdate.getDay() < 7;
      mdate.setDate(mdate.getDate() + 1)
    ) {
      partitions.forEach((partition) => {
        weeklypartitions.push(mdate.toLocaleDateString() + '-' + partition);
      });
    }

    return this.ClientService.DownloadShiftsFromPartitions(weeklypartitions);
  }
  FormWriteShiftsReq(shifts: ShiftDto[]) {
    const res = this.ClientService.WriteShifts(shifts);
    return;
  }
}
