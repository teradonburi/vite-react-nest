import * as fs from "node:fs";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AllExceptionsFilter } from "./all-exception.filter";
import { AppModule } from "./app/app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix("api");
	const adapterHost = app.get(HttpAdapterHost);
	app.useGlobalFilters(new AllExceptionsFilter(adapterHost));

	if (process.env.NODE_ENV !== "production") {
		// CORS
		app.enableCors({
			origin: "*",
			allowedHeaders:
				"Authorization, Origin, X-Requested-With, Content-Type, Accept",
		});
		// remove unused request parameters
		app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

		// Swagger
		const config = new DocumentBuilder()
			.setTitle("api example")
			.setDescription("The API description")
			.setVersion("1.0")
			.addTag("example")
			.build();
		const document = SwaggerModule.createDocument(app, config);
		// Swagger UIにアクセスするためのエンドポイント
		SwaggerModule.setup("api-docs", app, document);

		// export to JSON
		fs.writeFileSync("./swagger.json", JSON.stringify(document, null, 2));
	}

	await app.listen(process.env.PORT || 3000);
}
bootstrap();
