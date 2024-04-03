import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './model/cart.model';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart)
    private cartModel: typeof Cart,
  ) {}

  /**
   * Creates a new cart entry.
   * @param createCartDto Data to create a new cart entry.
   * @returns The newly created cart entry.
   */
  async create(createCartDto: CreateCartDto) {
    return this.cartModel.create(createCartDto);
  }

  /**
   * Retrieves all cart entries.
   * @returns A list of all cart entries.
   */
  async findAll() {
    return this.cartModel.findAll();
  }

  /**
   * Retrieves a specific cart entry by ID.
   * @param id The ID of the cart entry to retrieve.
   * @returns The cart entry with the specified ID.
   * @throws NotFoundException if the cart entry is not found.
   */
  async findOne(id: number) {
    const cart = await this.cartModel.findByPk(id);
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }
    return cart;
  }

  /**
   * Updates a specific cart entry by ID.
   * @param id The ID of the cart entry to update.
   * @param updateCartDto Data to update the cart entry.
   * @returns The updated cart entry.
   * @throws NotFoundException if the cart entry is not found.
   */
  async update(id: number, updateCartDto: UpdateCartDto) {
    const [numberOfAffectedRows, [updatedCart]] = await this.cartModel.update(
      updateCartDto,
      {
        where: { id },
        returning: true,
      },
    );
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }
    return updatedCart;
  }

  /**
   * Removes a specific cart entry by ID.
   * @param id The ID of the cart entry to remove.
   * @throws NotFoundException if the cart entry is not found.
   */
  async remove(id: number) {
    const numberOfDeletedRows = await this.cartModel.destroy({ where: { id } });
    if (numberOfDeletedRows === 0) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }
    return 'Successfully removed';
  }
}
