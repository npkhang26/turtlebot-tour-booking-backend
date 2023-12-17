import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDTO , LoginDTO} from "./dto";
@Controller('auth')
export class AuthController {

    // auth sevice auto init do co @Injectable
    constructor (private authService: AuthService) {
    }

    @Post("register")
    register(@Body() body: RegisterDTO) {
        return this.authService.register(body);
    }

    @Post("login")
    login(@Body() body: LoginDTO) {
        return this.authService.login(body);
    }
}
