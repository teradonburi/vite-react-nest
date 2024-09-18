import React from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
	const { children } = props;
	return (
		<div>
			<header style={{ borderBottom: "thin solid black", paddingBottom: 10 }}>
				<ol style={{ listStyle: "none", display: "flex", padding: 0 }}>
					<li style={{ marginRight: 8 }}>
						<Link to="/">トップ</Link>
					</li>
					<li style={{ marginRight: 8 }}>
						<Link to="/signup">ユーザ登録</Link>
					</li>
					<li style={{ marginRight: 8 }}>
						<Link to="/login">ログイン</Link>
					</li>
				</ol>
			</header>
			<main>{children}</main>
			<footer
				style={{
					borderTop: "thin solid black",
					marginTop: 10,
					paddingTop: 10,
					textAlign: "right",
				}}
			>
				2024 Example
			</footer>
		</div>
	);
};

export default Layout;
