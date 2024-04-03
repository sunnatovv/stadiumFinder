import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserCartDto } from './dto/create-user_cart.dto';
import { UpdateUserCartDto } from './dto/update-user_cart.dto';
import { UserCart } from './model/user_cart.model';

@Injectable()
export class UserCartService {
  constructor(
    @InjectModel(UserCart)
    private userCartModel: typeof UserCart,
  ) {}

  /**
   * Creates a new user cart entry.
   * @param createUserCartDto Data to create a new user cart entry.
   * @returns The newly created user cart entry.
   */
  async create(createUserCartDto: CreateUserCartDto) {
    return this.userCartModel.create(createUserCartDto);
  }

  /**
   * Retrieves all user cart entries.
   * @returns A list of all user cart entries.
   */
  async findAll() {
    return this.userCartModel.findAll();
  }

  /**
   * Retrieves a specific user cart entry by ID.
   * @param id The ID of the user cart entry to retrieve.
   * @returns The user cart entry with the specified ID.
   * @throws NotFoundException if the user cart entry is not found.
   */
  async findOne(id: number) {
    const userCart = await this.userCartModel.findByPk(id);
    if (!userCart) {
      throw new NotFoundException(`User cart with ID ${id} not found`);
    }
    return userCart;
  }

  /**
   * Updates a specific user cart entry by ID.
   * @param id The ID of the user cart entry to update.
   * @param updateUserCartDto Data to update the user cart entry.
   * @returns The updated user cart entry.
   * @throws NotFoundException if the user cart entry is not found.
   */
  async update(id: number, updateUserCartDto: UpdateUserCartDto) {
    const [numberOfAffectedRows, [updatedUserCart]] =
      await this.userCartModel.update(updateUserCartDto, {
        where: { id },
        returning: true,
      });
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`User cart with ID ${id} not found`);
    }
    return updatedUserCart;
  }

  /**
   * Removes a specific user cart entry by ID.
   * @param id The ID of the user cart entry to remove.
   * @throws NotFoundException if the user cart entry is not found.
   */
  async remove(id: number) {
    const numberOfDeletedRows = await this.userCartModel.destroy({
      where: { id },
    });
    if (numberOfDeletedRows === 0) {
      throw new NotFoundException(`User cart with ID ${id} not found`);
    }
    return 'Successfully removed';
  }
}
