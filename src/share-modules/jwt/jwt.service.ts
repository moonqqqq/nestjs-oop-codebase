import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ILoggerService } from '../logger/interface/logger-service.interface';
import * as jwt from 'jsonwebtoken';
import { ErrorBody } from '../../common/constants/error-body';
import { IUserPayload } from '../../common/dtos/user-payload.dto';
import { JWTTokensDTO } from '../../modules/users/dtos/jwt-token.dto';

@Injectable()
export class JWTService {
  constructor(
    private configService: ConfigService,
    private readonly loggerService: ILoggerService,
  ) {}

  async createJWT(userData: IUserPayload): Promise<JWTTokensDTO> {
    const payload = userData;

    const [accessToken, refreshToken] = await Promise.all([
      this.#signToken(
        payload,
        this.configService.get('app.jwtSecret'),
        this.configService.get('app.jwtAccessExpire'),
      ),
      this.#signToken(
        payload,
        this.configService.get('app.jwtSecret'),
        this.configService.get('app.jwtRefreshExpire'),
      ),
    ]);

    return new JWTTokensDTO({
      accessToken: `Bearer ${accessToken}`,
      refreshToken: `Bearer ${refreshToken}`,
    });
  }

  async #signToken(
    payload: Partial<IUserPayload>,
    secretKey: string,
    expiresIn: string | number,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const options = {
        expiresIn: expiresIn,
      };

      jwt.sign(payload, secretKey, options, (err, token) => {
        if (err) {
          this.loggerService.error(err);
          reject(err);
        } else {
          resolve(token as string);
        }
      });
    });
  }

  async verifyToken(token: string): Promise<IUserPayload> {
    return new Promise((resolve, reject) => {
      if (token.split(' ')[0] !== 'Bearer') {
        throw new BadRequestException({ message: 'Not proper token' });
      }

      jwt.verify(
        token.split(' ')[1],
        this.configService.get('app.jwtSecret'),
        (err, decoded) => {
          if (err) {
            if (err.message === 'jwt expired') {
              reject(new UnauthorizedException(ErrorBody.JWT_EXPIRED));
            } else if (err.message === 'invalid signature') {
              reject(
                new UnauthorizedException({ message: 'Invalid signature' }),
              );
            } else if (err.message === 'jwt malformed') {
              reject(new UnauthorizedException(ErrorBody.JWT_MALFORMED));
            } else {
              this.loggerService.error(err);
              reject(err);
            }
          } else {
            resolve(decoded as IUserPayload);
          }
        },
      );
    });
  }
}
