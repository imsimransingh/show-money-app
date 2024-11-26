import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class XeroService {
  private readonly xeroApiUrl =
    'http://localhost:3000/api.xro/2.0/Reports/BalanceSheet';

  constructor(private readonly httpService: HttpService) {}

  async getBalanceSheet(): Promise<any> {
    try {
      const response: AxiosResponse = await lastValueFrom(
        this.httpService.get(this.xeroApiUrl)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch Balance Sheet data from Xero',
        error.response?.status || 500,
      );
    }
  }
}
