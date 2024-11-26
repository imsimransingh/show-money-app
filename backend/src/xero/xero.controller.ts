import { Controller, Get } from '@nestjs/common';
import { XeroService } from './xero.service';

@Controller('xero')
export class XeroController {
  constructor(private readonly xeroService: XeroService) {}

  @Get('balance-sheet')
  async getBalanceSheet() {
    return await this.xeroService.getBalanceSheet();
  }
}
