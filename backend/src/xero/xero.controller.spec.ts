import { Test, TestingModule } from '@nestjs/testing';
import { XeroController } from './xero.controller';
import { XeroModule } from './xero.module';

describe('XeroController', () => {
  let controller: XeroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [XeroModule], 
    }).compile();

    controller = module.get<XeroController>(XeroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

