import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common/enums';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const data = await this.userService.create(createUserDto);

      return res
        .status(
          data.status == false ? HttpStatus.BAD_REQUEST : HttpStatus.CREATED,
        )
        .json({ status: data.status, message: data.message });
    } catch (e) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ staus: false, message: 'Registrasi gagal' });
    }
  }

  @Get()
  findAll(@Res() res: Response) {
    try {
      const data = this.userService.findAll();
      return res
        .status(HttpStatus.OK)
        .json({ status: true, message: 'Mendapatkan seluruh data', data });
    } catch (e) {
      console.log(e);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const update = await this.userService.update(id, updateUserDto);

    if (update.status) return res.status(HttpStatus.ACCEPTED).json(update);
    return res.status(HttpStatus.BAD_REQUEST).json(update);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
