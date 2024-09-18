import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { GetHelloResponse } from "./app.dto";
import { CommonResponseDto } from "../common-response.dto";

@Injectable()
export class AppService {
	getHello(): CommonResponseDto<GetHelloResponse> {
		return {
			success: true,
			date: new Date(),
			data: {
				message: "Hello World!",
			},
			error: null,
		};
	}

	getError(): void {
		// WARN: Force to throw internal server error.
		throw new InternalServerErrorException("Internal Server Error");
	}
}
