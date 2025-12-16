import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type User = {
  userId: string;
  email: string;
  password?: string;
  name?: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: '1',
      email: 'user@email.com',
      password: '123123', // In real app, this should be hashed
      name: 'Test User',
    },
  ];

  constructor(configService: ConfigService) {
    this.users.push({
      userId: '2',
      password: '123123', // In real app, this should be hashed
      email: configService.getOrThrow<string>('TEST_OUTLOOK_EMAIL'),
      name: configService.getOrThrow<string>('TEST_OUTLOOK_USER_NAME'),
    });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const lowerCaseMail = email.toLowerCase();
    return this.users.find(user => user.email?.toLowerCase() === lowerCaseMail);
  }

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }
}
