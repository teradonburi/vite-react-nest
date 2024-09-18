import React from "react";
import { usersApi } from "../store/api/enhancedApis/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const UserPage: React.FC = () => {
	const id = useSelector((state: RootState) => state.auth.id);
	const { isLoading, data: response } = usersApi.useUsersControllerFindOneQuery(
		{ id },
	);
	return (
		<div>
			{isLoading ? <div>loading...</div> : <div>{response?.data?.name}</div>}
		</div>
	);
};

export default UserPage;
