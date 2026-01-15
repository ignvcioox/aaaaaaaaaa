import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'test@gmail.com',
    description: 'Correo electrónico del usuario',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Abc12345', description: 'Contraseña del usuario' })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @MaxLength(50, { message: 'La contraseña no debe exceder los 50 caracteres' })
  password: string;
}
