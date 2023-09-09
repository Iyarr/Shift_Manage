import { Injectable } from '@nestjs/common';
import { DynamodbService } from '../dynamodb/dynamodb.service';
import { LoginUserData, NewUserData, UpdateUserItem } from 'types-module';
import {
  PutCommand,
  GetCommand,
  DeleteCommand,
  QueryCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';

@Injectable()
export class UserService {
  constructor(private dynamodbService: DynamodbService) {}

  VerifyUser(userItem: LoginUserData) {
    const command = new QueryCommand({
      TableName: 'Users',
      KeyConditionExpression: '#hashKey = :HashValue',
      ExpressionAttributeNames: {
        '#hashKey': 'userName',
        '#password': 'password',
      },
      FilterExpression: '#password = :PassValue',
      ExpressionAttributeValues: {
        ':HashValue': userItem.username,
        ':PassValue': userItem.password,
      },
      ProjectionExpression: 'isManager',
    });
    return this.dynamodbService.SubmitCommand(command);
  }

  GetUserInfo(Username: string) {
    const command = new GetCommand({
      TableName: 'Users',
      Key: {
        userName: Username,
      },
    });
    return this.dynamodbService.SubmitCommand(command);
  }

  NewUser(userItem: NewUserData) {
    console.log(userItem);
    const command = new PutCommand({
      TableName: 'Users',
      Item: userItem,
    });
    return this.dynamodbService.SubmitCommand(command);
  }

  UpdateUser(username: string, userItem: UpdateUserItem) {
    const ExpressionAttributeNames: Record<string, string> = {};
    const ExpressionAttributeValues: Record<string, string> = {};
    const UpdateExpression: string[] = [];

    ['password', 'displayName', 'isManager'].forEach((item) => {
      if (item in userItem) {
        ExpressionAttributeNames['#' + item] = item;
        ExpressionAttributeValues[':' + item] = userItem[item];
        UpdateExpression.push(' #' + item + ' = ' + ':' + item);
      }
    });

    const command = new UpdateCommand({
      TableName: 'Users',
      Key: { userName: username },
      ExpressionAttributeNames: ExpressionAttributeNames,
      ExpressionAttributeValues: ExpressionAttributeValues,
      UpdateExpression: 'SET' + UpdateExpression.join(','),
    });
    return this.dynamodbService.SubmitCommand(command);
  }

  DeleteUser(Username: string) {
    const command = new DeleteCommand({
      TableName: 'Users',
      Key: {
        userName: Username,
      },
    });
    return this.dynamodbService.SubmitCommand(command);
  }
}
