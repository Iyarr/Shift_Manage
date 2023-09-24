import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DynamodbModule } from '../dynamodb/dynamodb.module';
import { NewUserData } from 'types-module';

describe('UserService', () => {
  let service: UserService;
  const users: NewUserData[] = [
    {
      userName: 'test1',
      displayName: 'テスト1',
      password: 'testpass',
      isManager: false,
    },
    {
      userName: 'test2',
      displayName: 'テスト2',
      password: 'testpass',
      isManager: false,
    },
  ];
  const usersItem = [
    {
      userName: 'test1',
      displayName: 'テスト-1',
      password: 'testpass1',
    },
    {
      userName: 'test2',
      displayName: 'テスト-2',
      password: 'testpass2',
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
    const result = usersItem.map((user) => {
      const { userName, ...item } = user;
      return service.UpdateUser(user.userName, item);
    });
    expect(result).toBeDefined();
  });

  it('test NewUser', () => {
    const result = users.map((user) => {
      const userItem: Record<string, string | boolean> = user;
      return service.NewUser(userItem);
    });

    expect(result).toBeDefined();
  });

  it('test DeleteUser', () => {
    const result = users.map((user) => {
      return service.DeleteUser(user.userName);
    });

    expect(result).toBeDefined();
  });

  it('test GetUserInfo', () => {
    const result = users.map((user) => {
      return service.GetUserInfo(user.userName);
    });
    expect(result).toBeDefined();
  });

  it('test VerifyUser', () => {
    const result = users.map((user) => {
      return service.VerifyUser({
        username: user.userName,
        password: user.password,
      });
    });
    expect(result).toBeDefined();
  });
});
