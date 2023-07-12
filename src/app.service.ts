import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UploadService } from './modules/upload/upload.service';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  constructor(private readonly mailerService: MailerService) { }

  public sendEmail(toEmail: string, text: string): void {
    this
      .mailerService
      .sendMail({
        to: toEmail, // List of receivers email address
        from: 'andreasmkoyanreact@gmail.com', // Senders email address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: text, // plaintext body
        html: '<b>Link verify</b>', // HTML body content
      })
      .then((success) => {
        console.log(success)
      })
      .catch((err) => {
        console.log(err)
      });
  }

}
