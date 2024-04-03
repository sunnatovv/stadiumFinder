import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStadiumTimeDto } from './dto/create-stadium_time.dto';
import { UpdateStadiumTimeDto } from './dto/update-stadium_time.dto';
import { StadiumTimes } from './model/stadium_time.model';

@Injectable()
export class StadiumTimesService {
  constructor(
    @InjectModel(StadiumTimes)
    private stadiumTimesModel: typeof StadiumTimes,
  ) {}

  /**
   * Creates a new stadium time entry.
   * @param createStadiumTimeDto Data to create a new stadium time entry.
   * @returns The newly created stadium time entry.
   */
  async create(createStadiumTimeDto: CreateStadiumTimeDto) {
    return this.stadiumTimesModel.create(createStadiumTimeDto);
  }

  /**
   * Retrieves all stadium time entries.
   * @returns A list of all stadium time entries.
   */
  async findAll() {
    return this.stadiumTimesModel.findAll();
  }

  /**
   * Retrieves a specific stadium time entry by ID.
   * @param id The ID of the stadium time entry to retrieve.
   * @returns The stadium time entry with the specified ID.
   * @throws NotFoundException if the stadium time entry is not found.
   */
  async findOne(id: number) {
    const stadiumTime = await this.stadiumTimesModel.findByPk(id);
    if (!stadiumTime) {
      throw new NotFoundException(`Stadium time with ID ${id} not found`);
    }
    return stadiumTime;
  }

  /**
   * Updates a specific stadium time entry by ID.
   * @param id The ID of the stadium time entry to update.
   * @param updateStadiumTimeDto Data to update the stadium time entry.
   * @returns The updated stadium time entry.
   * @throws NotFoundException if the stadium time entry is not found.
   */
  async update(id: number, updateStadiumTimeDto: UpdateStadiumTimeDto) {
    const [numberOfAffectedRows, [updatedStadiumTime]] =
      await this.stadiumTimesModel.update(updateStadiumTimeDto, {
        where: { id },
        returning: true,
      });
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`Stadium time with ID ${id} not found`);
    }
    return updatedStadiumTime;
  }

  /**
   * Removes a specific stadium time entry by ID.
   * @param id The ID of the stadium time entry to remove.
   * @throws NotFoundException if the stadium time entry is not found.
   */
  async remove(id: number) {
    const numberOfDeletedRows = await this.stadiumTimesModel.destroy({
      where: { id },
    });
    if (numberOfDeletedRows === 0) {
      throw new NotFoundException(`Stadium time with ID ${id} not found`);
    }
    return 'Successfully removed';
  }
}
