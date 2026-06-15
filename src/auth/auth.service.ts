import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  login(email: string, password: string): { access_token: string } {
    const validEmail = this.config.getOrThrow('ADMIN_EMAIL');
    const validPassword = this.config.getOrThrow('ADMIN_PASSWORD');

    if (email !== validEmail || password !== validPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { access_token: this.jwt.sign({ sub: 'admin', email }) };
  }
}
