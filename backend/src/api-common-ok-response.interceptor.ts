import {
	ExecutionContext,
	Injectable,
	NestInterceptor,
	CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CommonResponseDto } from "./common-response.dto";

@Injectable()
export class CommonOkResponseInterceptor<T>
	implements NestInterceptor<T, CommonResponseDto<T>>
{
	intercept(
		_: ExecutionContext,
		next: CallHandler,
	): Observable<CommonResponseDto<T>> {
		return next.handle().pipe(
			map((data) => ({
				success: true,
				date: new Date(),
				data,
				error: null,
			})),
		);
	}
}
