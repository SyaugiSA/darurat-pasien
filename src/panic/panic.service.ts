import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryService } from 'src/history/history.service';
import { PasienService } from 'src/pasien/pasien.service';
import { Repository } from 'typeorm';
import { CreatePanicDto } from './dto/create-panic.dto';
import { UpdatePanicDto } from './dto/update-panic.dto';
import { Panic } from './entities/panic.entity';

@Injectable()
export class PanicService {
  constructor(
    @InjectRepository(Panic)
    private panicRespository: Repository<Panic>,
    private historyService: HistoryService,
    private pasienService: PasienService,
  ) {}

  async create(createPanicDto: CreatePanicDto) {
    return await this.panicRespository.insert(createPanicDto);
  }

  async findAll() {
    const panic = await this.panicRespository.findOne({
      where: {},
      order: { id: 'DESC' },
    });

    if (!panic) this.create({ status: 0 });

    return {
      message: 'Berhasil mendapatkan data',
      status: true,
      data: panic,
    };
  }

  async update(username: string, updatePanicDto: UpdatePanicDto) {
    const pasien = await this.pasienService.findOne(username);
    const data = await this.findAll();
    const update = await this.panicRespository.update(
      { id: data.data.id },
      updatePanicDto,
    );

    const history = await this.historyService.create({
      kamar: pasien.data[0].kamar,
      pasienId: pasien.data[0].id,
    });

    if (history.status) {
      if (update) return { message: 'Data berhasil direkam', status: true };

      return { message: 'Data gagal direkam', status: false };
    }
    return history;
  }

  async accespt() {
    const data = await this.findAll();
    const update = await this.panicRespository.update(
      { id: data.data.id },
      { status: 0 },
    );

    if (update) return { message: 'Alarm dimatikan', status: true };
    return { message: 'Gagal mematikan alarm', status: false };
  }
}
