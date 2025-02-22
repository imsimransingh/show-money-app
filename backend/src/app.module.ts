import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XeroModule } from './xero/xero.module';

@Module({
  imports: [HttpModule, XeroModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
