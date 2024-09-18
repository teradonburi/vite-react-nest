import { useAppControllerGetHelloQuery } from "../store/api/gen/app.gen";

function TopPage() {
	const { isLoading, data: response } = useAppControllerGetHelloQuery();

	return (
		<>
			<h1>React + NestJS</h1>
			<div>{isLoading ? <div>Loading...</div> : response.data.message}</div>
		</>
	);
}

export default TopPage;
