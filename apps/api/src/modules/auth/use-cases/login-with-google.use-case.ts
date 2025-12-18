import { LoginWithEmailUseCase } from '@/modules/auth/use-cases';
import { UsersService } from '@/modules/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class LoginWithGoogleUseCase {
  private client: OAuth2Client;
  private googleClientId: string;

  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly loginWithEmailUseCase: LoginWithEmailUseCase,
  ) {
    this.googleClientId =
      this.configService.getOrThrow<string>('GOOGLE_CLIENT_ID');
    this.client = new OAuth2Client(this.googleClientId);
  }

  async execute(token: string) {
    try {
      this.client.setCredentials({ access_token: token });
      const res = await this.client.request({
        url: 'https://www.googleapis.com/oauth2/v3/userinfo',
      });

      const profile = res.data as {
        email?: string;
        name?: string;
        sub?: string;
      };

      if (!profile || !profile.email) {
        throw new UnauthorizedException('Invalid Google token payload');
      }

      const { email, name, sub: googleId } = profile;

      let user = await this.usersService.findOneByEmail(email);

      if (!user) {
        user = await this.usersService.create({
          email: email,
          name: name || 'Unknown',
          userId: googleId || Date.now().toString(),
        });
      }

      return this.loginWithEmailUseCase.execute(user);
    } catch (error) {
      console.error('Google verification failed', error);
      throw new UnauthorizedException('Invalid Google token');
    }
  }
}
