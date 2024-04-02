import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConfortStadiumService } from './confort_stadium.service';
import { CreateConfortStadiumDto } from './dto/create-confort_stadium.dto';
import { UpdateConfortStadiumDto } from './dto/update-confort_stadium.dto';

@Controller('confort-stadium')
export class ConfortStadiumController {
  constructor(private readonly confortStadiumService: ConfortStadiumService) {}

  @Post()
  async create(@Body() createConfortStadiumDto: CreateConfortStadiumDto) {
    return this.confortStadiumService.create(createConfortStadiumDto);
  }

  @Get()
  async findAll() {
    return this.confortStadiumService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.confortStadiumService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateConfortStadiumDto: UpdateConfortStadiumDto,
  ) {
    return this.confortStadiumService.update(+id, updateConfortStadiumDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.confortStadiumService.remove(+id);
  }
}
