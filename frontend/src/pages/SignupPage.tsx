import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthControllerSignupMutation } from "../store/api/gen/auth.gen";
import { useNavigate } from "react-router-dom";

const signupFormSchema = z.object({
	name: z.string().min(1, { message: "名前を入力してください" }),
	email: z.string().email({ message: "メールアドレスを入力してください" }),
	password: z
		.string()
		.min(6, { message: "6桁以上のパスワードを入力してください" }),
});
type SignupFormSchemaType = Required<z.infer<typeof signupFormSchema>>;

const SignupPage: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignupFormSchemaType>({
		resolver: zodResolver(signupFormSchema),
	});
	const [signupMutation] = useAuthControllerSignupMutation();
	const navigate = useNavigate();

	const onSubmit = (values: SignupFormSchemaType) => {
		signupMutation({
			createUserDto: values,
		})
			.unwrap()
			.then(() => {
				navigate("/login");
			});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			style={{ display: "flex", flexDirection: "column" }}
		>
			<h1>ユーザ登録</h1>
			<input
				type="text"
				name="name"
				{...register("name")}
				placeholder="ユーザ名"
				required
				style={{ alignSelf: "baseline", marginBottom: 8, width: 200 }}
			/>
			{errors.name && <div>{errors.name.message}</div>}
			<input
				type="text"
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
				登録
			</button>
		</form>
	);
};

export default SignupPage;
