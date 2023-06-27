import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ShiftModule } from './shift/shift.module';

@Module({
  imports: [UserModule, ShiftModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
