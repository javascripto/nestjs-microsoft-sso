import { AppController } from '@/app.controller';
import { AuthModule } from '@/modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [],
  controllers: [AppController],
  imports: [ConfigModule.forRoot(), AuthModule],
})
export class AppModule {}
