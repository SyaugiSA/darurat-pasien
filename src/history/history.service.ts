import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasienService } from 'src/pasien/pasien.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateHistoryDto } from './dto/create-history.dto';
import { History } from './entities/history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private historyRepository: Repository<History>,
    private readonly pasienService: PasienService,
  ) {}

  async create(createHistoryDto: CreateHistoryDto) {
    const create = await this.historyRepository.insert({
      kamar: createHistoryDto.kamar,
      pasien: createHistoryDto.pasienId,
      tanggal: Date.now().toString(),
    });

    if (create) return { message: 'Data berhasil ditamnbahkan', status: true };
    return { message: 'Data gagal ditamnbahkan', status: false };
  }

  async findAll() {
    const data = await this.historyRepository.find();
    return { message: 'Data berhasil didapatkan', status: true, data };
  }

  async find(pasien: any) {
    const user = await this.pasienService.findOne(pasien);
    const history = await this.historyRepository.findBy({
      pasien: user.data.id,
    });

    let data = [];

    history.map((val) => {
      data.unshift({ kamar: val.kamar, tanggal: parseInt(val.tanggal) });
    });

    return { message: 'Data berhasil didapatkan', status: true, data };
  }
}
