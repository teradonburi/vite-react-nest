import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UserResponseDto {
	@ApiProperty({
		description: "name",
		example: "nickname",
	})
	@IsString()
	@IsNotEmpty()
	name: string;
}
