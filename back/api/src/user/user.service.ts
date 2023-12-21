import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DynamodbService } from '../dynamodb/dynamodb.service';
import { UpdateUserBody } from 'types-module';

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

  CreateUser(userItem: Record<string, string | boolean>) {
    const command = new PutItemCommand({
      TableName: 'Users',
      Item: this.dynamodbService.ObjectToAttributeValue(userItem),
    });

    try {
      return this.dynamodbClient.send(command);
    } catch (error) {
      console.error(error);
      return new HttpException('Bad Reaquest', HttpStatus.BAD_REQUEST);
    }
  }

  VerifyUser(userItem: Record<string, string>) {
    const command = new QueryCommand({
      TableName: 'Users',
      KeyConditionExpression: '#hashKey = :HashValue',
      ExpressionAttributeNames: {
        '#hashKey': 'id',
        '#password': 'password',
      },
      FilterExpression: '#password = :PassValue',
      ExpressionAttributeValues: {
        ':HashValue': { S: userItem.name },
        ':PassValue': { S: userItem.password },
      },
      ProjectionExpression: 'is_admin',
    });

    try {
      return this.dynamodbClient.send(command);
    } catch (error) {
      console.error(error);
      return new HttpException('Bad Reaquest', HttpStatus.BAD_REQUEST);
    }
  }

  GetUser(id: string) {
    const command = new GetItemCommand({
      TableName: 'Users',
      Key: {
        id: { S: id },
      },
    });

    try {
      return this.dynamodbClient.send(command);
    } catch (error) {
      console.error(error);
      return new HttpException('Bad Reaquest', HttpStatus.BAD_REQUEST);
    }
  }

  UpdateUser(id: string, userItem: UpdateUserBody) {
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

    try {
      return this.dynamodbClient.send(command);
    } catch (error) {
      console.error(error);
      return new HttpException('Bad Reaquest', HttpStatus.BAD_REQUEST);
    }
  }

  DeleteUser(id: string) {
    const command = new DeleteItemCommand({
      TableName: 'Users',
      Key: {
        id: { S: id },
      },
    });

    try {
      return this.dynamodbClient.send(command);
    } catch (error) {
      console.error(error);
      return new HttpException('Bad Reaquest', HttpStatus.BAD_REQUEST);
    }
  }
}
