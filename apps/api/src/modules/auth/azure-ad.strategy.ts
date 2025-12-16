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
    const baseUrl = 'https://login.microsoftonline.com';
    const identityMetadata = `${baseUrl}/common/v2.0/.well-known/openid-configuration`;
    super({
      clientID,
      // Allow both the Client ID (GUID) and the App ID URI as valid audiences
      audience: [clientID, `api://${clientID}`],
      loggingLevel: 'info',
      validateIssuer: false,
      passReqToCallback: false,
      identityMetadata: identityMetadata,
    });
  }

  async validate(data: unknown) {
    return data;
  }
}
