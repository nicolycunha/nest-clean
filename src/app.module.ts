import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from 'src/auth/auth.module'
import { AuthenticateController } from 'src/controllers/authenticate.controller'
import { CreateAccountController } from 'src/controllers/create-account.controller'
import { CreateQuestionController } from 'src/controllers/create-question.controller'
import { envSchema } from 'src/env'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true
    }),
    AuthModule
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController
  ],
  providers: [PrismaService]
})
export class AppModule {}
