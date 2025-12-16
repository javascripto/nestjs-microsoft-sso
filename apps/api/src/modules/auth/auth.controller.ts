import { IncomingMessage } from 'node:http';
import { AuthService } from '@/modules/auth/auth.service';
import { LoginDto } from '@/modules/auth/login-dto';
import { User } from '@/modules/users/users.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() { email, password }: LoginDto,
  ): Promise<{ access_token: string }> {
    const user = await this.authService.validateCredentials(email, password);
    return this.authService.loginWithEmail(user);
  }

  @Post('login/microsoft')
  @UseGuards(AuthGuard('azure-ad')) // Validate the MSAL token first
  loginMicrosoft(
    @Req() { user }: RequestWithMSProfile, // user contains the decoded Azure AD token profile
  ): Promise<{ access_token: string }> {
    return this.authService.loginWithMicrosoft(user); // Exchanges for API JWT
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  me(@Req() { user }: Request): User {
    return user as unknown as User;
  }

  @Get('microsoft/profile')
  @UseGuards(AuthGuard('azure-ad'))
  getMicrosoftProfile(@Req() { user }: RequestWithMSProfile) {
    return user;
  }
}

interface RequestWithMSProfile extends IncomingMessage {
  user: Record<string, string>;
}
