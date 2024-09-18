import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
	return (
		<div>
			<h1>存在しないページです</h1>
			<Link to="/">トップに戻る</Link>
		</div>
	);
};

export default NotFoundPage;
