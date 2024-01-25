import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DynamodbService } from '../dynamodb/dynamodb.service';
import { UpdateUserBody, res } from 'types-module';

import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  DeleteItemCommand,
  UpdateItemCommand,
  QueryCommand,
  AttributeValue,
} from '@aws-sdk/client-dynamodb';

@Injectable()
export class UserService {
  private dynamodbClient: DynamoDBClient;
  constructor(private dynamodbService: DynamodbService) {
    this.dynamodbClient = this.dynamodbService.GetClient();
  }

  async CreateUser(userItem: Record<string, string | boolean>) {
    const command = new PutItemCommand({
      TableName: 'Users',
      Item: this.dynamodbService.ObjectToAttributeValue(userItem),
    });

    const res: res = {
      status: 0,
      message: '',
    };

    try {
      await this.dynamodbClient.send(command);
      res.status = 200;
      res.message = 'Created!';
    } catch (error) {
      console.error(error);
      res.status = 400;
      res.message = 'Bad Reaquest';
    }

    return res;
  }

  async VerifyUser(userItem: Record<string, string>) {
    const command = new QueryCommand({
      TableName: 'Users',
      KeyConditionExpression: '#hashKey = :HashValue',
      ExpressionAttributeNames: {
        '#hashKey': 'id',
        '#password': 'password',
      },
      FilterExpression: '#password = :PassValue',
      ExpressionAttributeValues: {
        ':HashValue': { S: userItem.id },
        ':PassValue': { S: userItem.password },
      },
      ProjectionExpression: 'is_admin',
    });

    const res: res = {
      status: 0,
      message: '',
    };

    try {
      const output = await this.dynamodbClient.send(command);
      if (output.Count == 1) {
        res.status = 200;
        res.message = 'Verified!';
      } else {
        res.status = 404;
        res.message = 'Authentication Failed';
      }
    } catch (error) {
      console.error(error);
      res.status = 400;
      res.message = 'Bad Reaquest';
    }

    return res;
  }

  async GetUser(id: string) {
    const command = new GetItemCommand({
      TableName: 'Users',
      Key: {
        id: { S: id },
      },
    });

    const res: res = {
      status: 0,
      message: '',
    };

    try {
      const output = await this.dynamodbClient.send(command);
      res.status = 200;
      res.message = 'GET request successful';
      res.data = this.dynamodbService.AttributeValueToString(output.Item);
    } catch (error) {
      console.error(error);
      res.status = 400;
      res.message = 'Bad Reaquest';
    }

    return res;
  }

  async UpdateUser(id: string, userItem: UpdateUserBody) {
    const ExpressionAttributeNames: Record<string, string> = {};
    const ExpressionAttributeValues: Record<string, AttributeValue> = {};
    const UpdateExpression: string[] = [];

    ['password', 'name'].forEach((item) => {
      if (item in userItem) {
        ExpressionAttributeNames['#' + item] = item;
        ExpressionAttributeValues[':' + item] = { S: userItem[item] };
        UpdateExpression.push(' #' + item + ' = ' + ':' + item);
      }
    });

    if ('is_admin' in userItem) {
      ExpressionAttributeNames['#is_admin'] = 'is_admin';
      ExpressionAttributeValues[':is_admin'] = { BOOL: userItem['is_admin'] };
      UpdateExpression.push(' #is_admin = :is_admin');
    }

    const command = new UpdateItemCommand({
      TableName: 'Users',
      Key: { id: { S: id } },
      ExpressionAttributeNames: ExpressionAttributeNames,
      ExpressionAttributeValues: ExpressionAttributeValues,
      UpdateExpression: 'SET' + UpdateExpression.join(','),
    });

    const res: res = {
      status: 0,
      message: '',
    };

    try {
      await this.dynamodbClient.send(command);
      res.status = 200;
      res.message = 'Updated!';
    } catch (error) {
      console.error(error);
      res.status = 400;
      res.message = 'Bad Reaquest';
    }

    return res;
  }

  async DeleteUser(id: string) {
    const command = new DeleteItemCommand({
      TableName: 'Users',
      Key: {
        id: { S: id },
      },
    });

    const res: res = {
      status: 0,
      message: '',
    };

    try {
      await this.dynamodbClient.send(command);
      res.status = 200;
      res.message = 'Deleted!';
    } catch (error) {
      console.error(error);
      res.status = 400;
      res.message = 'Bad Reaquest';
    }

    return res;
  }
}
