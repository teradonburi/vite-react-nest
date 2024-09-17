import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class GetHelloResponse {
	@ApiProperty({
		description: "実行結果",
		example: true,
	})
	@IsString()
	@IsNotEmpty()
	message: string;
}
