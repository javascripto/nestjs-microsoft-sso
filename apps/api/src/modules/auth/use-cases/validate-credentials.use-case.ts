import { User, UsersService } from '@/modules/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ValidateCredentialsUseCase {
  constructor(private readonly usersService: UsersService) {}

  async execute(email: string, pass: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user || user.password !== pass)
      throw new UnauthorizedException('Invalid credentials');
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
