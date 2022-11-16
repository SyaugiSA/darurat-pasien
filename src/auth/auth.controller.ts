import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/user-login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from './dto/payload';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    const result = await this.authService.register(createUserDto);

    if (!result.status) return res.status(HttpStatus.BAD_REQUEST).json(result);

    return res.json(result).status(HttpStatus.ACCEPTED);
  }

  @Post('login')
  public async login(@Body() loginuserDto: LoginUserDto, @Res() res: Response) {
    const req = await this.authService.login(loginuserDto);

    if (!req.status) return res.status(HttpStatus.BAD_REQUEST).json(req);

    return res.status(HttpStatus.ACCEPTED).json(req);
  }

  @Get('akun')
  @UseGuards(AuthGuard())
  public async testAuth(@Req() req: any): Promise<JwtPayload> {
    return req.user;
  }
}
