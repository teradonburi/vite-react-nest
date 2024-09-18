import { Test, type TestingModule } from "@nestjs/testing";
import { AppService } from "./app.service";

describe("AppService", () => {
	let appService: AppService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			providers: [AppService],
		}).compile();

		appService = app.get<AppService>(AppService);
	});

	describe("root", () => {
		it('should return "Hello World!"', () => {
			const data = appService.getHello();
			expect(data).toEqual({ message: "Hello World!" });
		});
	});
});
