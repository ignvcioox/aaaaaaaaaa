import * as bcrypt from 'bcryptjs';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { MailService } from '@src/common/mail/mail.service';
import { UsersService } from '@modules/users/users.service';

import { createVerificationCodeEmail, createEmailHtml, createUserPayload } from '@src/helpers';

import { LoginDto, RegisterDto, VerifyEmailDto, RecoveryPasswordDto, ResetPasswordDto } from '@modules/auth/dto';

import { User } from '@modules/users/entities/user.entity';
import { generateVerificationCode } from '@src/helpers/code-generator';

@Injectable()
export class AuthService {

   constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService,
      private readonly mailService: MailService
   ) { }

   private readonly recoveryTokenExpiresIn = '15m';

   private async sendVerificationEmail(email: string, verificationCode: string, minutes: number = 15) {

      const html = createVerificationCodeEmail({
         title: 'Verifica tu correo electrónico',
         message:
            'Gracias por registrarte. Para activar tu cuenta, utiliza el siguiente código de verificación:',
         buttonText: `${verificationCode}`,
         footer: `El código expirará en ${minutes} minutos.`,
      });

      await this.mailService.sendMail(email, 'Verifica tu correo electrónico', html);
   }

   /**
   * Inicia sesión un usuario.
   * Si las credenciales son correctas, retorna el usuario y el token JWT y si no lanza una excepción.
   * @param loginDto - Data Transfer Object son los datos esperados para el inicio de sesión.
   * @returns El usuario autenticado y el token JWT.
   * @author Benjamín López
   */
   async login({ email, password }: LoginDto) {

      const user = await this.usersService.findOneByEmail(email);

      if (!user || !(await bcrypt.compare(password, user.password))) {
         throw new UnauthorizedException('El correo o la contraseña son incorrectos.');
      }

      const { password: _, ...userData } = user;

      const token = await this.jwtService.signAsync(createUserPayload(user));

      return {
         success: true,
         message: 'Inicio de sesión exitoso.',
         user: userData,
         token: token
      };
   };



   /**
   * Registra un nuevo usuario con un código de verificación.
   * Si el correo está en uso y el usuario está activo, lanza una excepción.
   * Si el usuario existe pero no está activo, genera y envía un nuevo código de verificación.
   * Si el usuario no existe, crea el usuario y envía el código de verificación.
   * @param registerDto - Data Transfer Object son los datos esperados para el registro de usuario.
   * @returns Mensaje de confirmación
   * @author Benjamín López
   */
   async register({ fullName, email, password }: RegisterDto) {

      const existingUser = await this.usersService.findOneByEmail(email);

      if (existingUser && existingUser.isActive) {
         throw new BadRequestException('El correo electrónico ya está en uso.');
      }

      const verificationCode = generateVerificationCode();
      const verificationCodeExpires = new Date(Date.now() + 15 * 60 * 1000);
      const expiresAtUTC = verificationCodeExpires.toISOString();
      const expiresAtLocal = verificationCodeExpires.toLocaleString('es-CL');

      if (existingUser && !existingUser.isActive) {

         existingUser.verificationCode = verificationCode;
         existingUser.verificationCodeExpires = verificationCodeExpires;

         await this.usersService.save(existingUser);

         await this.sendVerificationEmail(email, verificationCode, 15);

         return {
            success: true,
            message: 'Nuevo código de verificación enviado correctamente.',
            email,
            expiresAtUTC,
            expiresAtLocal,
         };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await this.usersService.create({
         fullName,
         email,
         password: hashedPassword,
         verificationCode,
         verificationCodeExpires,
         isActive: false,
      });

      await this.sendVerificationEmail(email, verificationCode, 15);

      return {
         success: true,
         message: 'Correo de verificación enviado correctamente.',
         email,
         expiresAtUTC,
         expiresAtLocal,
      };
   }



   /**
    * Verifica el código enviado por el usuario para activar su cuenta.
    * @param VerifyEmailDto - Data Transfer Object son los datos esperados para la verificación de correo.
    * @returns Mensaje de confirmación
    * @author Benjamín López
    */
   async verifyCodeEmail({ email, code }: VerifyEmailDto) {

      const user = await this.usersService.findOneByEmail(email);
      if (!user) throw new BadRequestException('El usuario no se ha encontrado.');

      if (user.verificationCode !== code) {
         throw new BadRequestException('El código de verificación es incorrecto.');
      }

      if (!user.verificationCodeExpires || user.verificationCodeExpires < new Date()) {
         throw new BadRequestException('El código de verificación ha expirado.');
      }

      user.isActive = true;
      user.verificationCode = null;
      user.verificationCodeExpires = null;

      await this.usersService.save(user);

      return {
         success: true,
         message: 'Correo verificado correctamente.'
      };
   }

   async recoveryPassword(recoveryPasswordDto: RecoveryPasswordDto) {
      const { email } = recoveryPasswordDto;
      const user = await this.usersService.findOneByEmail(email);
      if (!user) throw new BadRequestException('El correo no existe');

      const token = await this.jwtService.signAsync(
         { sub: user.id },
         { expiresIn: this.recoveryTokenExpiresIn },
      );

      const html = createEmailHtml({
         title: 'Recupera tu contraseña',
         message:
            'Has solicitado recuperar tu contraseña. Haz clic en el siguiente botón para establecer una nueva:',
         buttonText: 'Cambiar contraseña',
         buttonUrl: `http://localhost:4200/auth/reset-password?token=${token}`,
         footer: 'Si no solicitaste este cambio, puedes ignorar este mensaje.',
      });

      await this.mailService.sendMail(email, 'Recuperación de contraseña', html);

      return {
         success: true,
         message: 'Correo de recuperación enviado correctamente.'
      };
   }

   async resetPassword(resetPasswordDto: ResetPasswordDto) {
      try {
         const { token, newPassword } = resetPasswordDto;
         const payload = await this.jwtService.verifyAsync(token);
         const user = await this.usersService.findOneById(payload.sub);
         if (!user) throw new BadRequestException('Usuario no encontrado.');

         user.password = await bcrypt.hash(newPassword, 10);
         await this.usersService.save(user);

         return {
            success: true,
            message: 'Contraseña restablecida correctamente.'
         };
      } catch (error) {
         throw new BadRequestException(
            'Token de recuperación inválido o expirado.',
         );
      }
   }

   async checkAuthStatus(user: User) {
      const token = await this.jwtService.signAsync(createUserPayload(user));
      return { user, token };
   }
}
