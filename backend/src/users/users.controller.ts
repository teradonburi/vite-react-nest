import {
	Controller,
	Get,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	ValidationPipe,
	UseInterceptors,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation } from "@nestjs/swagger";
import { ApiCommonOkResponse } from "src/api-common-ok-response.decorator";
import { CommonOkResponseInterceptor } from "src/api-common-ok-response.interceptor";
import { UserResponseDto } from "./dto/get-user.dto";

@UseGuards(AuthGuard("jwt"))
@Controller("users")
export class UsersController {
	constructor(private readonly usersRespository: UsersService) {}

	@Get(":id")
	@ApiOperation({
		summary: "ユーザ取得",
		description: "ユーザを取得する。",
	})
	@ApiCommonOkResponse(UserResponseDto, "object")
	@UseInterceptors(CommonOkResponseInterceptor)
	findOne(@Param("id") id: string) {
		return this.usersRespository.findById(+id);
	}

	@Patch(":id")
	@ApiOperation({
		summary: "ユーザ更新",
		description: "ユーザを更新する。",
	})
	@ApiCommonOkResponse(UserResponseDto, "object")
	@UseInterceptors(CommonOkResponseInterceptor)
	update(
		@Param("id") id: string,
		@Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
	) {
		return this.usersRespository.update(+id, updateUserDto);
	}

	@Delete(":id")
	@ApiCommonOkResponse(UserResponseDto, "object")
	@UseInterceptors(CommonOkResponseInterceptor)
	remove(@Param("id") id: string) {
		return this.usersRespository.remove(+id);
	}
}
