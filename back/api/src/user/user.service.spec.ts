import { Test, TestingModule } from '@nestjs/testing';
import { DynamodbModule } from '../dynamodb/dynamodb.module';
import { UserItem } from 'types-module';
import { UserService } from './user.service';
import { GetTestUserData } from '../test-data/test-data';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DynamodbModule],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('test API CRUD Process', async () => {
    const users: UserItem[] = GetTestUserData();
    const promise = async (user: UserItem) => {
      try {
        // Create Test
        const CreateRes = await service.CreateUser(user);
        expect(CreateRes).toBeDefined();
        // Update Test
        const UpdateRes = await service.UpdateUser(user.id, {
          password: user.password + 'changed',
        });
        expect(UpdateRes).toBeDefined();
        // Verify Test
        const VerifyRes = await service.VerifyUser({
          id: user.id,
          password: user.password + 'changed',
        });
        expect(VerifyRes).toBeDefined();
        // Read Test
        const ReadRes = await service.GetUser(user.id);
        expect(ReadRes).toBeDefined();
        // Delete Test
        const DeleteRes = await service.DeleteUser(user.id);
        expect(DeleteRes).toBeDefined();
        return [CreateRes, UpdateRes, VerifyRes, ReadRes, DeleteRes];
      } catch (error) {
        console.error(error);
      }
    };
    const ressult = await Promise.all(users.map((user) => promise(user)));
    expect(ressult).toBeDefined();
    console.log(ressult);
  });
});
