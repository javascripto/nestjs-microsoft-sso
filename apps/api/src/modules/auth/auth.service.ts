import { LoginWithEmailUseCase } from '@/modules/auth/use-cases/login-with-email.use-case';
import { LoginWithMicrosoftUseCase } from '@/modules/auth/use-cases/login-with-microsoft.use-case';
import { ValidateCredentialsUseCase } from '@/modules/auth/use-cases/validate-credentials.use-case';
import { User } from '@/modules/users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly loginWithEmailUseCase: LoginWithEmailUseCase,
    private readonly loginWithMicrosoftUseCase: LoginWithMicrosoftUseCase,
    private readonly validateCredentialsUseCase: ValidateCredentialsUseCase,
  ) {}

  async validateCredentials(email: string, pass: string) {
    return this.validateCredentialsUseCase.execute(email, pass);
  }

  async loginWithEmail(user: User) {
    return this.loginWithEmailUseCase.execute(user);
  }

  async loginWithMicrosoft(profile: Record<string, string>) {
    return this.loginWithMicrosoftUseCase.execute(profile);
  }
}
