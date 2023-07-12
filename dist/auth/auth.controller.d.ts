import { AuthService } from './auth.service';
import { UserLogin } from 'src/user/interface/user.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any, user: UserLogin): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
    onlyAdmin(req: any): any;
    onlyUser(req: any): any;
}
