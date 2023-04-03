import { Injectable, OnModuleInit } from '@nestjs/common';

import { LoggerService } from '@base/logger';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  client: Redis;
  private logger;
  constructor(private readonly loggerService: LoggerService) {
    this.logger = this.loggerService.getLogger(RedisService.name);
    this.client = new Redis({
      host: 'localhost',
      port: 6379,
    });

    this.client.on('error', (err) => {
      this.logger.error('Redis error: ', err);
    });
  }

  async get(key: string): Promise<string> {
    return JSON.parse(await this.client.get(key));
  }

  async set(key: string, value: string) {
    return this.client.set(key, value);
  }

  async setWithExpiration(key: string, value: any, seconds: number) {
    return this.client.set(key, JSON.stringify(value), 'EX', seconds);
  }

  async del(key: string) {
    return this.client.del(key);
  }

  getClient() {
    return this.client;
  }
}
