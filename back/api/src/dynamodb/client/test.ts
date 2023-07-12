import {
  DynamoDBDocumentClient,
  PutCommand,
  BatchGetCommand,
  BatchWriteCommand,
} from '@aws-sdk/lib-dynamodb';

type Shift = {
  partition: string;
  userName: string;
};

const shiftItem = [
  { userName: 'Ohtani', partition: '2023-07-29-C' },
  { userName: 'yamada', partition: '2023-06-02-C' },
];

export class TestQuery {
  constructor(private dynamoDBDocClient: DynamoDBDocumentClient) {}
  testQuery() {
    const command = new BatchGetCommand({
      RequestItems: {
        Shifts: {
          Keys: shiftItem,
        },
      },
    });
    return this.resResult(command);
  }

  uploadShift(shift: Shift) {
    const command = new PutCommand({
      TableName: 'Shifts',
      Item: shift,
    });
    return this.resResult(command);
  }

  uploadsShift() {
    const command = new BatchWriteCommand({
      RequestItems: {
        Shifts: shiftItem.map((shift) => {
          return { PutRequest: { Item: shift } };
        }),
      },
    });
    return this.resResult(command);
  }

  deletesShift() {
    const command = new BatchWriteCommand({
      RequestItems: {
        Shifts: shiftItem.map((shift) => {
          return { DeleteRequest: { Key: shift } };
        }),
      },
    });
    return this.resResult(command);
  }

  async resResult(command) {
    const response = await this.dynamoDBDocClient.send(command);
    console.log(response);
    return JSON.stringify(response);
  }
}
