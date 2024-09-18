import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { GetHelloResponse } from "./app.dto";

@Injectable()
export class AppService {
	getHello(): GetHelloResponse {
		return {
			message: "Hello World!",
		};
	}

	getError(): void {
		// WARN: Force to throw internal server error.
		throw new InternalServerErrorException("Internal Server Error");
	}
}
