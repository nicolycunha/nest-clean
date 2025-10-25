import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CreateAccountController } from 'src/controllers/create-account.controller'
import { envSchema } from 'src/env'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true
    })
  ],
  controllers: [CreateAccountController],
  providers: [PrismaService]
})
export class AppModule {}
