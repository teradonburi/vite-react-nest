import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { ApiCommonOkResponse } from "../api-common-ok-response.decorator";
import { AppService } from "./app.service";
import { GetHelloResponse } from "./app.dto";
import { CommonOkResponseInterceptor } from "../api-common-ok-response.interceptor";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@ApiOperation({
		summary: "あいさつ取得",
		description: "あいさつを取得する。",
	})
	@ApiCommonOkResponse(GetHelloResponse, "object")
	@UseInterceptors(CommonOkResponseInterceptor)
	getHello(): GetHelloResponse {
		return this.appService.getHello();
	}

	@Get("error")
	@ApiOperation({
		summary: "(強制エラー)",
		description: "強制的にエラーを出力する。",
	})
	getError(): void {
		this.appService.getError();
	}
}
