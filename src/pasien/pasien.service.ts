import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePasienDto } from './dto/create-pasien.dto';
import { UpdatePasienDto } from './dto/update-pasien.dto';
import { Pasien } from './entities/pasien.entity';

@Injectable()
export class PasienService {
  constructor(
    @InjectRepository(Pasien)
    private pasienRepository: Repository<Pasien>,
  ) {}

  async create(createPasienDto: CreatePasienDto) {
    await this.pasienRepository.insert({
      no_rmd: createPasienDto.username,
      nama: createPasienDto.nama,
      usia: createPasienDto.usia,
      kamar: createPasienDto.kamar,
      penyakit: createPasienDto.penyakit,
      userId: createPasienDto.userId,
    });
    return { message: 'Pasien berhasil ditambahkan', status: true };
  }

  async findOne(no_rmd: string) {
    const data = await this.pasienRepository.findOneBy({ no_rmd });
    return {
      message: 'User ditemukan',
      status: true,
      data,
      history: data.histories,
    };
  }

  async update(no_rmd, updatePasienDto: UpdatePasienDto) {
    const update = await this.pasienRepository.update(no_rmd, {
      kamar: updatePasienDto.kamar,
      nama: updatePasienDto.nama,
      penyakit: updatePasienDto.penyakit,
      usia: updatePasienDto.usia,
    });

    if (update) return { message: 'Data berhasil diperbarui', status: true };
    return { message: 'Data gagal diperbarui', status: false };
  }
}
