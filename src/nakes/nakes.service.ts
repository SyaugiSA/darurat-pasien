import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNakeDto } from './dto/create-nake.dto';
import { UpdateNakeDto } from './dto/update-nake.dto';
import { Nake } from './entities/nake.entity';

@Injectable()
export class NakesService {
  constructor(
    @InjectRepository(Nake)
    private nakesRepository: Repository<Nake>,
  ) {}

  create(createNakeDto: CreateNakeDto) {
    this.nakesRepository.insert({
      no_nakes: createNakeDto.username,
      nama: createNakeDto.nama,
      userId: createNakeDto.userId,
    });
    return { message: 'Nakes berhasil ditambahkan', status: true };
  }

  async findOne(no_nakes: string) {
    const data = await this.nakesRepository.findOneBy({ no_nakes });
    return { message: 'User ditemukan', status: true, data };
  }

  async update(username: string, updateNakeDto: UpdateNakeDto) {
    const update = await this.nakesRepository.update(username, {
      no_nakes: updateNakeDto.username,
      nama: updateNakeDto.nama,
    });

    if (update) return { message: 'Data berhasil diperbarui', status: true };
    return { message: 'Data gagal diperbarui', status: false };
  }
}
