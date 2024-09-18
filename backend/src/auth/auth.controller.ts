import {
	Controller,
	UseGuards,
	Request,
	Body,
	Post,
	ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("signup")
	async signup(@Body(new ValidationPipe()) body: CreateUserDto) {
		return this.authService.signup(body);
	}

	// passport-local戦略を付与する
	@UseGuards(AuthGuard("local"))
	@Post("login")
	async login(@Request() req: { user: { id: number } }, @Body() _: LoginDto) {
		// LocalStrategy.validate()で認証して返した値がreq.userに入ってる
		const user = req.user;

		// JwtToken を返す
		return this.authService.login(user.id);
	}
}
