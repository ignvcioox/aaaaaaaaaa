import { IsEmail, IsNotEmpty, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class VerifyEmailDto {
   @IsEmail()
   email: string;

   @IsString()
   @Length(6, 6, { message: 'El código debe tener 6 dígitos.' })
   code: string;
}
