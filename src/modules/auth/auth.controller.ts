import { Body, Controller, Get, Post } from '@nestjs/common';

import {
   ApiBearerAuth,
   ApiTags,
} from '@nestjs/swagger';

import { AuthService } from '@modules/auth/auth.service';
import { Auth } from '@modules/auth/decorators/auth.decorator';
import { GetUser } from '@modules/auth/decorators/get-user.decorator';

import { LoginDto, RegisterDto, VerifyEmailDto, RecoveryPasswordDto, ResetPasswordDto } from '@modules/auth/dto';
import { User } from '@modules/users/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) { }

   @Post('login')
   login(@Body() loginDto: LoginDto) {
      return this.authService.login(loginDto);
   }

   @Post('register')
   register(@Body() registerDto: RegisterDto) {
      return this.authService.register(registerDto);
   }

   @Post('verify-email')
   verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
      return this.authService.verifyCodeEmail(verifyEmailDto);
   }

   @Post('recovery-password')
   async recoveryPassword(@Body() recoveryPasswordDto: RecoveryPasswordDto) {
      return this.authService.recoveryPassword(recoveryPasswordDto);
   }

   @Post('reset-password')
   async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
      return this.authService.resetPassword(resetPasswordDto);
   }

   @Get('check-status')
   @Auth()
   @ApiBearerAuth()
   checkAuthStatus(@GetUser() user: User) {
      return this.authService.checkAuthStatus(user);
   }
}
