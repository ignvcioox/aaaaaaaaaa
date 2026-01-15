import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { Auth } from "@modules/auth/decorators/auth.decorator";
import { ProductsService } from "./products.service";
import { CreateProductDto } from './dto/create-product.dto';
import { GetUser } from '@modules/auth/decorators/get-user.decorator';
import { User } from '@modules/users/entities/user.entity';
import { PaginationDto } from './dto/pagination.dto';

@Controller('products')
export class ProductsController {

   constructor(
      private readonly productsService: ProductsService
   ) { }

   @Post()
   @Auth()
   create(@Body() createProductDto: CreateProductDto, @GetUser() user: User) {
      return this.productsService.create(createProductDto, user);
   }

   @Get()
   findAll(@Query() paginationDto: PaginationDto) {
      return this.productsService.findAll(paginationDto);
   }
}