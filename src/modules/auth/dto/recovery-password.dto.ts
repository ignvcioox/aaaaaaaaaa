import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RecoveryPasswordDto {
  @ApiProperty({
    example: 'ignvcioweb@gmail.com',
    description: 'Correo electrónico del usuario',
  })
  @IsString()
  @IsEmail()
  email: string;
}
