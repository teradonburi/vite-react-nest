import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	findByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: { email },
		});
	}

	findById(id: number) {
		return this.prisma.user.findUnique({
			where: { id },
			select: {
				id: true,
				email: true,
				name: true,
			},
		});
	}

	create(data: CreateUserDto) {
		return this.prisma.user.create({
			data,
		});
	}

	update(id: number, data: UpdateUserDto) {
		return this.prisma.user.update({
			where: { id },
			data,
		});
	}

	remove(id: number) {
		return this.prisma.user.delete({
			where: { id },
		});
	}
}
