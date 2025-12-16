import { AppModule } from '@/../src/app.module';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // Variável para controlar mock do Microsoft
  let mockMicrosoftProfile: Record<string, string> | null = null;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard('azure-ad'))
      .useValue({
        canActivate: (context: ExecutionContext) => {
          if (mockMicrosoftProfile) {
            const req = context.switchToHttp().getRequest();
            req.user = mockMicrosoftProfile;
            return true;
          }
          return false;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  it('app should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('/auth/login (POST)', () => {
    it('should login with valid credentials', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: 'user@email.com', password: '123123' });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('access_token');
    });

    it('should fail with invalid credentials', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: 'user@email.com', password: 'wrong' });
      expect(res.status).toBe(401);
    });
  });

  // Microsoft login and protected routes would require mocking strategies or tokens
  describe('/auth/me (GET)', () => {
    let token: string;
    beforeAll(async () => {
      const res = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: 'user@email.com', password: '123123' });
      token = res.body.access_token;
    });

    it('should return user info with valid JWT', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('email', 'user@email.com');
    });

    it('should fail without JWT', async () => {
      const res = await request(app.getHttpServer()).get('/api/auth/me');
      expect(res.status).toBe(401);
    });
  });

  describe('/auth/login/microsoft (POST)', () => {
    it('should login with a valid Microsoft profile (mocked)', async () => {
      mockMicrosoftProfile = {
        preferred_username: 'user@email.com',
        name: 'Test User',
        oid: 'microsoft-oid-123',
      };
      const res = await request(app.getHttpServer())
        .post('/api/auth/login/microsoft')
        .send();
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('access_token');
      mockMicrosoftProfile = null;
    });
  });
});
