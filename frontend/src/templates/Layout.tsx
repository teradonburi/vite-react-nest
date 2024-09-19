import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store";
import { logout } from "../store/api/auth";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
	const { children } = props;
	const isLogggedIn = useSelector((state: RootState) => !!state.auth.id);
	const dispatch = useDispatch();

	return (
		<div>
			<header style={{ borderBottom: "thin solid black", paddingBottom: 10 }}>
				<ol style={{ listStyle: "none", display: "flex", padding: 0 }}>
					<li style={{ marginRight: 8 }}>
						<Link to="/">トップ</Link>
					</li>
					{isLogggedIn ? (
						<>
							<li style={{ marginRight: 8 }}>
								<Link to="/user">ユーザ</Link>
							</li>
							<li style={{ marginRight: 8 }}>
								<Link onClick={() => dispatch(logout())} to="">
									ログアウト
								</Link>
							</li>
						</>
					) : (
						<>
							<li style={{ marginRight: 8 }}>
								<Link to="/signup">ユーザ登録</Link>
							</li>
							<li style={{ marginRight: 8 }}>
								<Link to="/login">ログイン</Link>
							</li>
						</>
					)}
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
