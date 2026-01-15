import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { ProductImage } from "./entities/product-image.entity";
import { AuthModule } from "@modules/auth/auth.module";
import { PassportModule } from "@nestjs/passport";

@Module({
   controllers: [ProductsController],
   providers: [ProductsService],
   imports: [
      TypeOrmModule.forFeature([Product, ProductImage]),
      AuthModule,
      PassportModule.register({ defaultStrategy: 'jwt' })
   ],
   exports: [
      ProductsService,
      TypeOrmModule
   ]
})
export class ProductsModule {}