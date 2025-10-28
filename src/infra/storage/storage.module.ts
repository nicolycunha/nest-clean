import { Module } from '@nestjs/common'
import { Uploader } from '@/domain/forum/application/storage/uploader'
import { R2Storage } from '@/infra/storage/r2-storage'
import { EnvModule } from '@/infra/env/env.module'

@Module({
  imports: [EnvModule],
  providers: [{ provide: Uploader, useClass: R2Storage }],
  exports: [Uploader]
})
export class StorageModule {}
