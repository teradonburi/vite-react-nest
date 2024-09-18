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
import { ApiCommonOkResponse } from "../api-common-ok-response.decorator";
import { CommonOkResponseInterceptor } from "../api-common-ok-response.interceptor";
import { UserResponseDto } from "./dto/get-user.dto";
import { plainToClass } from "class-transformer";

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
	async findOne(@Param("id") id: string) {
		const user = await this.usersRespository.findById(+id);
		return plainToClass(UserResponseDto, user, {
			excludeExtraneousValues: true,
		});
	}

	@Patch(":id")
	@ApiOperation({
		summary: "ユーザ更新",
		description: "ユーザを更新する。",
	})
	@ApiCommonOkResponse(UserResponseDto, "object")
	@UseInterceptors(CommonOkResponseInterceptor)
	async update(
		@Param("id") id: string,
		@Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
	) {
		const user = await this.usersRespository.update(+id, updateUserDto);
		return plainToClass(UserResponseDto, user, {
			excludeExtraneousValues: true,
		});
	}

	@Delete(":id")
	@ApiCommonOkResponse(UserResponseDto, "object")
	@UseInterceptors(CommonOkResponseInterceptor)
	async remove(@Param("id") id: string) {
		return await this.usersRespository.remove(+id);
	}
}
