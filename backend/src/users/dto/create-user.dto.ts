import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
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

	@ApiProperty({
		description: "name",
		example: "nickname",
	})
	@IsString()
	@IsNotEmpty()
	name: string;
}
