import { LoginWithEmailUseCase } from '@/modules/auth/use-cases';
import { UsersService } from '@/modules/users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginWithMicrosoftUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly loginWithEmailUseCase: LoginWithEmailUseCase,
  ) {}

  async execute(profile: Record<string, string>) {
    const email =
      profile.preferred_username ||
      profile.upn ||
      profile.userPrincipalName ||
      profile.email;

    if (!email) {
      throw new Error(
        `Email not found in Microsoft profile. Claims received: ${JSON.stringify(profile)}`,
      );
    }

    let user = await this.usersService.findOneByEmail(email);

    if (!user) {
      user = await this.usersService.create({
        email: email,
        name: profile.name || 'Unknown',
        userId: profile.oid || profile.sub || Date.now().toString(),
      });
    }
    return this.loginWithEmailUseCase.execute(user);
  }
}
