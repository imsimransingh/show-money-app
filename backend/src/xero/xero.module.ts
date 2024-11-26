import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { XeroService } from './xero.service';
import { XeroController } from './xero.controller';

@Module({
  imports: [HttpModule],
  providers: [XeroService],
  controllers: [XeroController],
  exports: [XeroService]
})
export class XeroModule {}
