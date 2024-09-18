import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsNotEmpty } from "class-validator";

export class CommonResponseDto<TData> {
	@Expose()
	@ApiProperty({
		description: "実行結果",
		example: true,
	})
	@IsBoolean()
	@IsNotEmpty()
	success: boolean;

	@Expose()
	@ApiProperty({
		description: "レスポンス送信日時",
		example: "2024-03-12T07:45:29.583Z",
		type: Date,
	})
	@IsDate()
	date: Date;

	@Expose()
	@ApiProperty({
		description: "データ",
	})
	@IsNotEmpty()
	data: TData | TData[];

	@Expose()
	@ApiProperty({
		description: "エラー内容",
		example: [],
	})
	@IsArray()
	@IsNotEmpty()
	error: string;
}
