import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthControllerLoginMutation } from "../store/api/gen/auth.gen";

const loginFormSchema = z.object({
	email: z.string().email({ message: "メールアドレスを入力してください" }),
	password: z
		.string()
		.min(6, { message: "6桁以上のパスワードを入力してください" }),
});
type LoginFormSchemaType = Required<z.infer<typeof loginFormSchema>>;

const LoginPage: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormSchemaType>({
		resolver: zodResolver(loginFormSchema),
	});
	const [loginMutation] = useAuthControllerLoginMutation();

	const onSubmit = (values: LoginFormSchemaType) => {
		loginMutation({
			loginDto: values,
		})
			.unwrap()
			.then((data) => {
				console.log(data);
			});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			style={{ display: "flex", flexDirection: "column" }}
		>
			<h1>ログイン</h1>
			<input
				type="email"
				name="email"
				{...register("email")}
				placeholder="メールアドレス"
				required
			/>
			{errors.email && <div>{errors.email.message}</div>}
			<input
				type="password"
				name="password"
				{...register("password")}
				placeholder="パスワード"
				required
			/>
			{errors.password && <div>{errors.password.message}</div>}
			<button type="submit">ログイン</button>
		</form>
	);
};

export default LoginPage;
