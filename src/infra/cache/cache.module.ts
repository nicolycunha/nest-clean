import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module'
import { RedisService } from '@/infra/cache/redis/redis.service'
import { CacheRepository } from '@/infra/cache/cache-repository'
import { RedisCacheRepository } from '@/infra/cache/redis/redis-cache-repository'

@Module({
  imports: [EnvModule],
  providers: [
    RedisService,
    {
      provide: CacheRepository,
      useClass: RedisCacheRepository
    }
  ],
  exports: [CacheRepository]
})
export class CacheModule {}
