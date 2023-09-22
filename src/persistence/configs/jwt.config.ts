import { JwtModuleOptions } from '@nestjs/jwt';

export class JwtConfig {
  private readonly SECRET: string;
  private readonly SUBJECT: string;
  private readonly ISSUER: string;
  private readonly AUDIENCE: string;
  private readonly EXPIRES_IN: string;

  constructor(private readonly prefix: string) {
    this.SECRET = process.env[[this.prefix, 'SECRET'].join('_')];
    this.SUBJECT = process.env[[this.prefix, 'SUBJECT'].join('_')];
    this.ISSUER = process.env[[this.prefix, 'ISSUER'].join('_')];
    this.AUDIENCE = process.env[[this.prefix, 'AUDIENCE'].join('_')];
    this.EXPIRES_IN = process.env[[this.prefix, 'EXPIRES_IN'].join('_')];
  }

  public getOptions(): JwtModuleOptions {
    return {
      secret: this.SECRET,
      signOptions: {
        subject: this.SUBJECT,
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
        expiresIn: this.EXPIRES_IN,
      },
      verifyOptions: {
        subject: this.SUBJECT,
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
      },
    };
  }
}
