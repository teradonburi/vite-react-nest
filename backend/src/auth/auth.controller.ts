import {
	Controller,
	UseGuards,
	Request,
	Body,
	Post,
	ValidationPipe,
	UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginRequestDto, LoginResponseDto } from "./dto/login.dto";
import { CommonOkResponseInterceptor } from "../api-common-ok-response.interceptor";
import { ApiCommonOkResponse } from "../api-common-ok-response.decorator";
import { UserResponseDto } from "../users/dto/get-user.dto";
import { ApiOperation } from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("signup")
	@ApiOperation({
		summary: "ユーザ登録",
		description: "ユーザを登録する。",
	})
	@ApiCommonOkResponse(UserResponseDto, "object")
	@UseInterceptors(CommonOkResponseInterceptor)
	async signup(@Body(new ValidationPipe()) body: CreateUserDto) {
		return await this.authService.signup(body);
	}

	// passport-local戦略を付与する
	@UseGuards(AuthGuard("local"))
	@Post("login")
	@ApiOperation({
		summary: "ログイン",
		description: "ログインする。",
	})
	@ApiCommonOkResponse(LoginResponseDto, "object")
	@UseInterceptors(CommonOkResponseInterceptor)
	async login(
		@Request() req: { user: { id: number } },
		@Body() _: LoginRequestDto,
	) {
		// LocalStrategy.validate()で認証して返した値がreq.userに入ってる
		const user = req.user;

		// JwtToken を返す
		return await this.authService.login(user.id);
	}
}
