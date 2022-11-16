import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/user-login.dto';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './dto/payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly JwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.findByLogin(loginUserDto);
    const token = this._createToken(user.user?.username);

    if (!user.status) return { status: user.status, message: user.message };

    return {
      status: user.status,
      message: user.message,
      user: user.user,
      ...token,
    };
  }

  async validateUser(payload: JwtPayload) {
    const user = await this.userService.findByPayload(payload);

    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken(username: any) {
    const expired = this.configService.get('EXPIRED');

    const user: JwtPayload = { username };
    const token = this.JwtService.sign(user);
    return {
      expired,
      token,
    };
  }
}
