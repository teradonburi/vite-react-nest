import { join } from "node:path";
import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, "../../../../frontend/dist"),
		}),
		PrismaModule,
		AuthModule,
		UsersModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
