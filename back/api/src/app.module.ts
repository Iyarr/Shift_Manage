import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ShiftModule } from './shift/shift.module';
import { DynamodbModule } from './dynamodb/dynamodb.module';

@Module({
  imports: [UserModule, ShiftModule, DynamodbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
