import { Type, applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { CommonResponseDto } from "./common-response.dto";

export const ApiCommonOkResponse = <TModel extends Type<unknown>>(
	model: TModel,
	type: "array" | "object",
) => {
	return applyDecorators(
		ApiExtraModels(CommonResponseDto, model),
		ApiOkResponse({
			schema: {
				title: `ApiCommonResponseOf${model.name}`,
				allOf: [
					{ $ref: getSchemaPath(CommonResponseDto) },
					{
						properties: {
							data:
								type === "array"
									? {
											type: "array",
											items: { $ref: getSchemaPath(model) },
										}
									: {
											type: "object",
											$ref: getSchemaPath(model),
										},
						},
					},
				],
			},
		}),
	);
};
