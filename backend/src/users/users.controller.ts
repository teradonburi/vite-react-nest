import {
	Controller,
	Get,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	ValidationPipe,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard("jwt"))
@Controller("users")
export class UsersController {
	constructor(private readonly usersRespository: UsersService) {}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.usersRespository.findById(+id);
	}

	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
	) {
		return this.usersRespository.update(+id, updateUserDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.usersRespository.remove(+id);
	}
}
