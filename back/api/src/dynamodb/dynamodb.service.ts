import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import * as dotenv from 'dotenv';

@Injectable()
export class DynamodbService {
  private dynamoDBDocClient: DynamoDBDocumentClient;

  constructor() {
    dotenv.config();
    this.dynamoDBDocClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({
        region: 'ap-northeast-1',
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      }),
    );
  }

  async SubmitCommand(command) {
    const response = await this.dynamoDBDocClient.send(command);
    console.log(response);
    /*
    if (err) {
      if (err.code === 'ResourceNotFoundException') {
        console.error('DynamoDB Resource Not Found Error:', err.message);
        // リソースが存在しない場合の処理
      } else if (err.code === 'ProvisionedThroughputExceededException') {
        console.error('DynamoDB Throughput Exceeded Error:', err.message);
        // スループット制限を超えた場合の処理
      } else {
        console.error('DynamoDB Error:', err.message);
        // その他のエラーに対する処理
      }
    } else {
      // 正常なデータの処理
      console.log('DynamoDB Response:', data);
    }
    */
    return response;
  }
}
