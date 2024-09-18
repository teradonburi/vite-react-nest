import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { PrismaModule } from "../prisma/prisma.module";

describe("UsersService", () => {
	let usersService: UsersService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [PrismaModule],
			providers: [UsersService],
		}).compile();

		usersService = module.get<UsersService>(UsersService);
	});

	it("should be defined", () => {
		expect(usersService).toBeDefined();
	});
});
