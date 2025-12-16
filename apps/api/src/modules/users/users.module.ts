import { UsersService } from '@/modules/users/users.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  exports: [UsersService],
  providers: [UsersService],
})
export class UsersModule {}
