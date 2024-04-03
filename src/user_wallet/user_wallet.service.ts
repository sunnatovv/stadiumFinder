import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserWalletDto } from './dto/create-user_wallet.dto';
import { UpdateUserWalletDto } from './dto/update-user_wallet.dto';
import { UserWallet } from './model/user_wallet.model';

@Injectable()
export class UserWalletService {
  constructor(
    @InjectModel(UserWallet)
    private userWalletModel: typeof UserWallet,
  ) {}

  /**
   * Creates a new user wallet entry.
   * @param createUserWalletDto Data to create a new user wallet entry.
   * @returns The newly created user wallet entry.
   */
  async create(createUserWalletDto: CreateUserWalletDto) {
    return this.userWalletModel.create(createUserWalletDto);
  }

  /**
   * Retrieves all user wallet entries.
   * @returns A list of all user wallet entries.
   */
  async findAll() {
    return this.userWalletModel.findAll();
  }

  /**
   * Retrieves a specific user wallet entry by ID.
   * @param id The ID of the user wallet entry to retrieve.
   * @returns The user wallet entry with the specified ID.
   * @throws NotFoundException if the user wallet entry is not found.
   */
  async findOne(id: number) {
    const userWallet = await this.userWalletModel.findByPk(id);
    if (!userWallet) {
      throw new NotFoundException(`User wallet with ID ${id} not found`);
    }
    return userWallet;
  }

  /**
   * Updates a specific user wallet entry by ID.
   * @param id The ID of the user wallet entry to update.
   * @param updateUserWalletDto Data to update the user wallet entry.
   * @returns The updated user wallet entry.
   * @throws NotFoundException if the user wallet entry is not found.
   */
  async update(id: number, updateUserWalletDto: UpdateUserWalletDto) {
    const [numberOfAffectedRows, [updatedUserWallet]] =
      await this.userWalletModel.update(updateUserWalletDto, {
        where: { id },
        returning: true,
      });
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`User wallet with ID ${id} not found`);
    }
    return updatedUserWallet;
  }

  /**
   * Removes a specific user wallet entry by ID.
   * @param id The ID of the user wallet entry to remove.
   * @throws NotFoundException if the user wallet entry is not found.
   */
  async remove(id: number) {
    const numberOfDeletedRows = await this.userWalletModel.destroy({
      where: { id },
    });
    if (numberOfDeletedRows === 0) {
      throw new NotFoundException(`User wallet with ID ${id} not found`);
    }
    return 'Successfully removed';
  }
}
