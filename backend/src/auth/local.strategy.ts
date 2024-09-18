import { Strategy as BaseLocalStrategy } from "passport-local";

import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService, PasswordOmitUser } from "./auth.service";

/**
 * @description usernameとpasswordを使った認証処理を行うクラス
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(BaseLocalStrategy) {
	constructor(private authService: AuthService) {
		super({ usernameField: "email" });
	}

	async validate(email: string, password: string): Promise<PasswordOmitUser> {
		// 認証して結果を受け取る
		const user = await this.authService.validateUser(email, password);

		if (!user) {
			throw new UnauthorizedException(); // 認証失敗
		}

		return user;
	}
}
