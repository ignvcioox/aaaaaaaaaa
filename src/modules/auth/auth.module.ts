import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from '@modules/auth/auth.controller';
import { AuthService } from '@modules/auth/auth.service';
import { UsersModule } from '@modules/users/users.module';
import { User } from '@modules/users/entities/user.entity';

import { JwtStrategy } from '@modules/auth/strategies/jwt.strategy';
import { MailService } from '@src/common/mail/mail.service';

@Module({
   imports: [
      UsersModule,
      TypeOrmModule.forFeature([User]),
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.registerAsync({
         useFactory: async (configService: ConfigService) => ({
            global: true,
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '1h' },
         }),
         inject: [ConfigService]
      }),
   ],
   controllers: [AuthController],
   providers: [AuthService, JwtStrategy, MailService],
})
export class AuthModule { }
