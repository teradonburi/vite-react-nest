import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
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
