import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from '@/infra/env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    //logger: false
  })

  const configServer = app.get(EnvService)
  const port = configServer.get('PORT')

  await app.listen(port)
}
bootstrap()
