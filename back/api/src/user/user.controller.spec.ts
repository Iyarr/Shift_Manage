import { Test, TestingModule } from '@nestjs/testing';
import { UserItem } from 'types-module';
import { UserController } from './user.controller';
import { GetTestUserData } from '../test-data/test-data';

describe('UserService', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('test API CRUD Process', async () => {});
});
