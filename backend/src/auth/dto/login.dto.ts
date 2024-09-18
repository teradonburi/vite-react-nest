import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginRequestDto {
	@ApiProperty({
		description: "Email",
		example: "test@example.com",
	})
	@IsString()
	@IsNotEmpty()
	email: string;

	@ApiProperty({
		description: "password",
		example: "password",
	})
	@IsString()
	@IsNotEmpty()
	password: string;
}

export class LoginResponseDto {
	@ApiProperty({
		description: "user id",
		example: "1",
	})
	@IsString()
	@IsNotEmpty()
	id: string;

	@Expose()
	@ApiProperty({
		description: "jwt token",
		example:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlhdCI6MTcyNjY0NzQ5MywiZXhwIjoxNzI2NjQ4NjkzfQ.Ac7bLt8f6JoshNX_V0hbbJZj_3LfGcupY3ffFQRKpak",
	})
	@IsString()
	@IsNotEmpty()
	access_token: string;
}
