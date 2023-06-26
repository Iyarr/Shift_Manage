import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

type userSec = {
  username: string;
  password: string;
};

type userInfo = {
  displayName: string;
  username: string;
  password: string;
};

@Injectable()
export class ShiftService {
  getShift(date: string, DynamodbClient: DynamoDBClient): JSON {
    const result = [
      {
        date: '2023-01-01',
        member: {
          X: ['大谷', '佐藤', '山田'],
          Y: ['大谷', '山田'],
          Z: ['山田', '佐藤'],
          A: ['大谷'],
          B: ['山田'],
          C: ['佐藤'],
          D: [],
        },
      },
      {
        date: '2023-01-02',
        member: {
          X: ['大谷', '佐藤', '山田'],
          Y: ['大谷', '山田'],
          Z: ['山田', '佐藤'],
          A: ['大谷'],
          B: ['山田'],
          C: ['佐藤'],
          D: [],
        },
      },
    ];
    return JSON.parse(JSON.stringify(result));
  }

  patchShift(data: JSON, DynamodbClient: DynamoDBClient): JSON {
    const result = {
      update: {
        result: true,
      },
    };

    return JSON.parse(JSON.stringify(result));
  }
}

@Injectable()
export class UserService {
  postAuth(user: userSec, DynamodbClient: DynamoDBClient): JSON {
    const result = {
      result: true,
      is_manager: false,
      false_count: 0,
    };

    return JSON.parse(JSON.stringify(result));
  }

  postUser(user: userInfo, DynamodbClient: DynamoDBClient): JSON {
    const result = {
      update: {
        result: true,
      },
    };

    return JSON.parse(JSON.stringify(result));
  }
}
