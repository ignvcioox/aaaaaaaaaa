import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {

   private transporter: nodemailer.Transporter;

   constructor(private readonly configService: ConfigService) {
      this.transporter = nodemailer.createTransport({
         service: 'gmail',
         auth   : {
            user: this.configService.get<string>('MAIL_USER'),
            pass: this.configService.get<string>('MAIL_PASSWORD'),
         },
      });

      this.transporter.verify().catch(() => {
         console.error('Configuración SMTP inválida.');
      });
   }

   async sendMail(to: string, subject: string, html: string): Promise<void> {
      try {
         await this.transporter.sendMail({ to, subject, html });
      } catch (error) {
         throw new Error('El correo no pudo ser enviado.');
      }
   }
}