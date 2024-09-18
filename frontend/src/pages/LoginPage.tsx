import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthControllerLoginMutation } from "../store/api/gen/auth.gen";
import { useNavigate } from "react-router-dom";
import { login } from "../store/api/auth";
import { useDispatch } from "react-redux";

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
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onSubmit = (values: LoginFormSchemaType) => {
		loginMutation({
			loginRequestDto: values,
		})
			.unwrap()
			.then((response) => {
				dispatch(login(response.data));
				navigate("/user", { replace: true });
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
				style={{ alignSelf: "baseline", marginBottom: 8, width: 200 }}
			/>
			{errors.email && <div>{errors.email.message}</div>}
			<input
				type="password"
				name="password"
				{...register("password")}
				placeholder="パスワード"
				required
				style={{ alignSelf: "baseline", marginBottom: 8, width: 200 }}
			/>
			{errors.password && <div>{errors.password.message}</div>}
			<button
				type="submit"
				style={{ alignSelf: "baseline", marginBottom: 8, width: 200 }}
			>
				ログイン
			</button>
		</form>
	);
};

export default LoginPage;
