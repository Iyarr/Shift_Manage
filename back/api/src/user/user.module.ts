import { Module } from '@nestjs/common';
import { DynamodbModule } from '../dynamodb/dynamodb.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DynamodbModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
