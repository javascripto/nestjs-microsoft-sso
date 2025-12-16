import { AuthController } from '@/modules/auth/auth.controller';
import { AuthService } from '@/modules/auth/auth.service';
import { AzureADStrategy } from '@/modules/auth/azure-ad.strategy';
import { JwtStrategy } from '@/modules/auth/jwt.strategy';
import {
  LoginWithEmailUseCase,
  LoginWithMicrosoftUseCase,
  ValidateCredentialsUseCase,
} from '@/modules/auth/use-cases';
import { UsersModule } from '@/modules/users/users.module';
import { UsersService } from '@/modules/users/users.service';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { StringValue } from 'ms';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      async useFactory(config: ConfigService) {
        const secret = config.getOrThrow<string>('JWT_SECRET');
        const expiresIn = config.getOrThrow<StringValue>('JWT_EXPIRES_IN');
        return { secret, signOptions: { expiresIn } };
      },
    }),
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    AuthService,
    UsersService,
    AzureADStrategy,
    LoginWithEmailUseCase,
    LoginWithMicrosoftUseCase,
    ValidateCredentialsUseCase,
  ],
})
export class AuthModule {}
