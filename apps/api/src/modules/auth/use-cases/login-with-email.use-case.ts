import { User } from '@/modules//users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginWithEmailUseCase {
  constructor(private readonly jwtService: JwtService) {}

  execute({ email, name, userId }: User) {
    const payload = { name, email, sub: userId };
    return { access_token: this.jwtService.sign(payload) };
  }
}
