import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynamodbService } from './dynamodb/dynamodb.service';
import { DynamodbModule } from './dynamodb/dynamodb.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ShiftModule } from './shift/shift.module';

@Module({
  imports: [DynamodbModule, UserModule, ShiftModule],
  controllers: [AppController],
  providers: [AppService, DynamodbService, UserService],
})
export class AppModule {}
