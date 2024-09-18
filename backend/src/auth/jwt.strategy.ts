// import先が'passport-local'では無い事に注意！
import { ExtractJwt, Strategy as BaseJwtStrategy } from "passport-jwt";

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";

/**
 * @description JWTの認証処理を行うクラス
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(BaseJwtStrategy) {
	// @ts-ignore ConfigServiceをInjectするがクラス変数としてでなく引数としてのみ使いたい（thisはsuperの引数に使えない）
	constructor(private readonly configService: ConfigService) {
		super({
			// Authorization bearerからトークンを読み込む関数を返す
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			// 有効期間を無視するかどうか
			ignoreExpiration: false,
			// envファイルから秘密鍵を渡す
			secretOrKey: configService.get<string>("JWT_SECRET_KEY"),
		});
	}

	// jwtService.sign()の引数をvalidate()に渡す
	async validate(payload: { sub: number; email: string }) {
		return { userId: payload.sub, username: payload.email };
	}
}
