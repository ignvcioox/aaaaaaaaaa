import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/product-image.entity';
import { Repository, DataSource } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from '@modules/users/entities/user.entity';
import { PaginationDto } from './dto/pagination.dto';

export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    private readonly dataSource: DataSource,
  ) {}

  async create(createProductDto: CreateProductDto, user: User) {
    try {
      const { images = [], ...productDetails } = createProductDto;
      const product = this.productRepository.create({
        ...productDetails,
        images: images.map((image) =>
          this.productImageRepository.create({ url: image }),
        ),
        user,
      });
      await this.productRepository.save(product);
      return { ...product, images };
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true,
      },
      order: {
        id: 'ASC',
      },
      where: {},
    });

    const totalProducts = await this.productRepository.count({
      where: {},
    });

    return {
      count: totalProducts,
      pages: Math.ceil(totalProducts / limit),
      products: products.map((product) => ({
        ...product,
        images: product.images?.map((img) => img.url),
      })),
    };
  }
}
