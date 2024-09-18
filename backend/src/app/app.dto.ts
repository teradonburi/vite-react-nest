import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class GetHelloResponse {
	@ApiProperty({
		description: "メッセージ",
		example: "Hello World!",
	})
	@IsString()
	@IsNotEmpty()
	message: string;
}
