import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { NoCache } from './no-cache.decorator';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get('cities')
  getAllCities() {
    this.logger.log('Handling GET request in MyController');
    this.logger.warn('This is a warning message');
    this.logger.error('This is an error message');
    return this.appService.getAllCities();
  }

  @Get()
  async welcome(@Query('city') cityName: string) {
    console.log("query", cityName)
    this.logger.log('Handling GET request in MyController');
    this.logger.warn('This is a warning message');
    this.logger.error('This is an error message');
    return await this.appService.findCity(cityName);
  }

  @Post()
  createCity(@Body() city: string) {
    return this.appService.createCity(city);
  }
}
