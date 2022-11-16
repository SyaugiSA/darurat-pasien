import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/user-login.dto';
import * as bcrypt from 'bcrypt';
import { PasienService } from 'src/pasien/pasien.service';
import { NakesService } from 'src/nakes/nakes.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private pasienServices: PasienService,
    private nakeService: NakesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto.username)
      return { message: 'Username tidak boleh kosong', status: false };

    if (!createUserDto.password)
      return { message: 'Password tidak boleh kosong', status: false };

    if (!createUserDto.nama)
      return { message: 'Nama tidak boleh kosong', status: false };

    if (createUserDto.role === 1) {
      if (!createUserDto.usia)
        return { message: 'Usia tidak boleh kosong', status: false };

      if (!createUserDto.kamar)
        return { message: 'Kamar tidak boleh kosong', status: false };
    }

    const ready = await this.usersRepository.findOneBy({
      username: createUserDto.username,
    });

    if (ready) return { message: 'User tersedia', status: false };

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(createUserDto.password, salt);

    const insert = await this.usersRepository.insert({
      username: createUserDto.username,
      role: createUserDto.role,
      password: hash,
    });

    if (createUserDto.role === 1)
      this.pasienServices.create({
        userId: insert.identifiers[0].id,
        ...createUserDto,
      });
    if (createUserDto.role === 2)
      this.nakeService.create({
        userId: insert.identifiers[0].id,
        ...createUserDto,
      });

    return { message: 'Registrasi berhasil', status: true };
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(username: string) {
    const user = await this.usersRepository.findOneBy({ username });
    if (user.role === 1) {
      return this.pasienServices.findOne(user.username);
    }
    return this.nakeService.findOne(user.username);
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    return updateUserDto.role === 1
      ? await this.pasienServices.update(username, updateUserDto)
      : await this.nakeService.update(username, updateUserDto);
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }

  async findByLogin({ username, password }: LoginUserDto) {
    const user = await this.usersRepository.findOne({ where: { username } });

    if (!user) {
      return { status: false, message: 'User Tidak Ditemukan' };
    }

    const areEqual = await bcrypt.compareSync(password, user.password);

    if (!areEqual) {
      return { status: false, message: 'Password Salah' };
    }

    return { user, message: 'Login Berhasil', status: true };
  }

  async findByPayload(username) {
    return await this.usersRepository.findOne({
      where: { username: username.username },
    });
  }
}
