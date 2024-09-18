import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class UserResponseDto {
	@Expose()
	@ApiProperty({
		description: "name",
		example: "nickname",
	})
	@IsString()
	@IsNotEmpty()
	name: string;
}
