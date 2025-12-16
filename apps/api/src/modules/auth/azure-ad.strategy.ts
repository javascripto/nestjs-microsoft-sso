import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';

@Injectable()
export class AzureADStrategy extends PassportStrategy(
  BearerStrategy,
  'azure-ad',
) {
  constructor(configService: ConfigService) {
    const clientID = configService.getOrThrow<string>('AZURE_CLIENT_ID');
    const tenantId = configService.getOrThrow<string>('AZURE_TENANT_ID');
    const baseUrl = 'https://login.microsoftonline.com';
    const identityMetadata = `${baseUrl}/${tenantId}/v2.0/.well-known/openid-configuration`;
    super({
      clientID,
      audience: clientID,
      loggingLevel: 'info',
      validateIssuer: true,
      passReqToCallback: false,
      identityMetadata: identityMetadata,
    });
  }

  async validate(data: unknown) {
    return data;
  }
}
