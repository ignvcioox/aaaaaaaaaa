import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ProductImage } from '@modules/products/entities/product-image.entity';
import { User } from '@modules/users/entities/user.entity';

@Entity({ name: 'products' })
export class Product {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column('text')
   title: string;

   @Column('float', { default: 0 })
   price: number;

   @Column({ type: 'text', nullable: true })
   description: string;

   @Column('text', { unique: true })
   slug: string;

   @Column('int', { default: 0 })
   stock: number;

   @OneToMany(
      () => ProductImage,
      (productImage) => productImage.product,
      { cascade: true, eager: true }
   )
   images?: ProductImage[];

   @ManyToOne(
      () => User,
      (user) => user.product,
      { eager: true }
   )
   user: User;

   @BeforeInsert()
   checkSlugInsert() {

      if (!this.slug) {
         this.slug = this.title;
      }

      this.slug = this.slug
         .toLowerCase()
         .replaceAll(' ', '_')
         .replaceAll("'", '')

   }

   @BeforeUpdate()
   checkSlugUpdate() {
      this.slug = this.slug
         .toLowerCase()
         .replaceAll(' ', '_')
         .replaceAll("'", '')
   }
}