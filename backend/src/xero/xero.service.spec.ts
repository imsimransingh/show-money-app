import { Test, TestingModule } from '@nestjs/testing';
import { XeroService } from './xero.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { HttpException } from '@nestjs/common';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const mockHttpService = {
  get: jest.fn(),
};

describe('XeroService', () => {
  let service: XeroService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        XeroService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<XeroService>(XeroService);
    httpService = module.get<HttpService>(HttpService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return balance sheet data on success', async () => {
    const mockResponse: AxiosResponse = {
      data: { message: 'Success' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: {},
      } as InternalAxiosRequestConfig,
    };

    jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));

    const result = await service.getBalanceSheet();
    expect(result).toEqual(mockResponse.data);
  });

  it('should throw an HttpException when the request fails with an error response', async () => {
    jest.spyOn(httpService, 'get').mockReturnValue(
      throwError(() => ({ response: { status: 404 } })),
    );

    await expect(service.getBalanceSheet()).rejects.toThrow(HttpException);
    await expect(service.getBalanceSheet()).rejects.toThrow(
      'Failed to fetch Balance Sheet data from Xero',
    );
  });

  it('should throw an HttpException with status 500 if no status is provided', async () => {
    jest.spyOn(httpService, 'get').mockReturnValue(throwError(() => ({})));

    await expect(service.getBalanceSheet()).rejects.toThrow(HttpException);
    await expect(service.getBalanceSheet()).rejects.toThrow(
      'Failed to fetch Balance Sheet data from Xero',
    );
  });
});
