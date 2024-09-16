import * as fs from "node:fs";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix("api");

	const config = new DocumentBuilder()
		.setTitle("api example")
		.setDescription("The API description")
		.setVersion("1.0")
		.addTag("example")
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api-docs", app, document);

	// JSON
	fs.writeFileSync("./swagger.json", JSON.stringify(document, null, 2));

	await app.listen(process.env.PORT || 3000);
}
bootstrap();
