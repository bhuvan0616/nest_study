import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './interface/jwt-payload.interface';
import { InjectModel } from 'nestjs-typegoose';
import { User } from './model/user.model';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '12w3rgftkjsn97&6430(',
    });
  }

  // noinspection JSUnusedGlobalSymbols
  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.userModel.findOne({ username: payload.username }, '-password').lean();
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
