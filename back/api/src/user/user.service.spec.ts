import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DynamodbModule } from '../dynamodb/dynamodb.module';
import { LoginUserData, NewUserData, UpdateUserItem } from 'types-module';

describe('UserService', () => {
  let service: UserService;
  const users = [
    {
      userName: 'sato',
      displayName: '佐藤',
      password: 'satopass',
      isManager: false,
    },
    {
      userName: 'kishimoto',
      displayName: '岸本',
      password: 'kishimotopass',
      isManager: false,
    },
    {
      userName: 'yamada',
      displayName: '山田',
      password: 'yamadapass',
      isManager: false,
    },
    {
      userName: 'Ohtani',
      displayName: '大谷',
      password: 'Ohtanipass',
      isManager: false,
    },
    {
      userName: 'taniyama',
      displayName: '谷山',
      password: 'taniyamapass',
      isManager: true,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DynamodbModule],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('test UpdateUser', () => {
    const result = users.map((user) => {
      const { userName, ...item } = user;
      return service.UpdateUser(user.userName, {
        displayName: user.displayName,
        password: user.password,
        isManager: user.isManager,
      });
    });
    expect(result).toBeDefined();
    // metadata.httpStatusCode < 400
  });
  /*
  it('test NewUser', () => {
    const result = users.map((user) => {
      return service.NewUser(user);
    });
    expect(result).toBeDefined();
    // metadata.httpStatusCode < 400
  });

  it('test DeleteUser', () => {
    const result = users.map((user) => {
      return service.DeleteUser(user.userName);
    });
    expect(result).toBeDefined();
    // metadata.httpStatusCode < 400
  });
*/
  it('test GetUserInfo', () => {
    const result = users.map((user) => {
      return service.GetUserInfo(user.userName);
    });
    expect(result).toBeDefined();
    // metadata.httpStatusCode < 400
  });

  it('test VerifyUser', () => {
    const result = users.map((user) => {
      return service.VerifyUser({
        username: user.userName,
        password: user.password,
      });
    });
    expect(result).toBeDefined();
    // metadata.httpStatusCode < 400
  });
});
