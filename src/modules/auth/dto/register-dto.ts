import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'Benjamin Lopez',
    description: 'Nombre completo del usuario',
  })
  @IsString()
  @MinLength(3)
  fullName: string;

  @ApiProperty({
    example: 'test@gmail.com',
    description: 'Correo electrónico del usuario',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Abc1234!', description: 'Contraseña del usuario' })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @MaxLength(50, { message: 'La contraseña no debe exceder los 50 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]+$/, {
    message:
      'La contraseña debe contener al menos una mayúscula, una minúscula, un número, un carácter especial y no debe tener espacios',
  })
  password: string;
}
