import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "@prisma/client";

export type PasswordOmitUser = Omit<User, "password">;

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	// ユーザ登録
	async signup(payload: CreateUserDto) {
		const saltOrRounds = 10;
		const hashPassword = await bcrypt.hash(payload.password, saltOrRounds);

		const data = {
			...payload,
			password: hashPassword,
		};

		const newUser = await this.usersService.create(data);
		return newUser;
	}

	// ユーザーを認証する
	async validateUser(
		email: string,
		password: string,
	): Promise<PasswordOmitUser | null> {
		const user = await this.usersService.findByEmail(email); // DBからUserを取得

		// DBに保存されているpasswordはハッシュ化されている事を想定しているので、
		// bcryptなどを使ってパスワードを判定する
		if (user && bcrypt.compareSync(password, user.password)) {
			const { password, ...result } = user; // パスワード情報を外部に出さないようにする

			return result;
		}

		return null;
	}

	// JWTトークンを返す
	async login(id: number) {
		const user = await this.usersService.findById(id);
		if (!user) {
			throw new NotFoundException();
		}
		const payload = { sub: user.id, email: user.email };

		return {
			id: user.id,
			access_token: this.jwtService.sign(payload),
		};
	}
}
