import { IsString, MinLength, IsEmail, MaxLength } from 'class-validator';

export class CreateUserDto {
   @IsString()
   @MinLength(3)
   fullName: string;

   @IsString()
   @IsEmail()
   email: string;

   @IsString()
   @MinLength(6)
   @MaxLength(50)
   password: string;

   verificationCode?: string;

   verificationCodeExpires?: Date;

   isActive?: boolean;
}
