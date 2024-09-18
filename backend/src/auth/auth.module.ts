import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";

import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";

// Strategyクラス
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";
import { AuthController } from "./auth.controller";

@Module({
	imports: [
		UsersModule,
		PassportModule,
		ConfigModule,
		JwtModule.registerAsync({
			inject: [ConfigService], // useFactoryで使う為にConfigServiceを注入する
			useFactory: async (configService: ConfigService) => {
				return {
					// JWT_SECRET_KEYの作成は以下のコマンドで行う
					// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
					// envファイルから秘密鍵を渡す
					secret: configService.get<string>("JWT_SECRET_KEY"),
					signOptions: {
						// 有効期間を設定
						expiresIn: "1200s",
					},
				};
			},
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
