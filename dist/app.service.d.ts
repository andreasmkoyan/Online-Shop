import { MailerService } from '@nestjs-modules/mailer';
export declare class AppService {
    private readonly mailerService;
    getHello(): string;
    constructor(mailerService: MailerService);
    sendEmail(toEmail: string, text: string): void;
}
