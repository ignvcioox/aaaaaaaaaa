import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ResetPasswordDto {
  @IsString({ message: 'El token debe ser un string.' })
  @IsNotEmpty({ message: 'El token es obligatorio.' })
  @MinLength(10, { message: 'El token es demasiado corto.' })
  @MaxLength(500, { message: 'El token es demasiado largo.' })
  token: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @MaxLength(50, { message: 'La contraseña no debe exceder los 50 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]+$/, {
    message:
      'La contraseña debe contener al menos una mayúscula, una minúscula, un número, un carácter especial y no debe tener espacios',
  })
  newPassword: string;
}
