import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from '@/infra/auth/jwt.strategy'
import { Env } from '@/infra/env/env'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { EnvModule } from '@/infra/env/env.module'
import { EnvService } from '@/infra/env/env.service'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      global: true,
      useFactory(config: EnvService) {
        const privateKey = config.get('JWT_PRIVATE_KEY')
        const publicKey = config.get('JWT_PUBLIC_KEY')

        return {
          signOptions: {
            algorithm: 'RS256'
          },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64')
        }
      }
    })
  ],
  providers: [
    JwtStrategy,
    EnvService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AuthModule {}
