import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { CommonResponseDto } from "./common-response.dto";

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
	constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

	catch(exception: unknown, host: ArgumentsHost): void {
		// In certain situations `httpAdapter` might not be available in the
		// constructor method, thus we should resolve it here.
		const { httpAdapter } = this.httpAdapterHost;

		const ctx = host.switchToHttp();

		const httpStatus =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		let error: string;
		if (exception instanceof HttpException) {
			error = exception.message;
		} else {
			error = exception.toString();
		}

		// 共通エラーレスポンス
		const responseBody: CommonResponseDto<null> = {
			success: false,
			date: new Date(),
			data: null,
			error,
		};

		httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
	}
}
