import { Outlet, Link } from "react-router-dom";
import "./styles/appHeader.scss";

const AppHeader = () => {
	return (
		<div className="app-core">
			<header className="top-header">
				<div className="inner">
					<nav>
						<ul>
							<li>
								<Link to="/">Dashboard</Link>
							</li>
							<li>
								<Link to="new-user">New User</Link>
							</li>
						</ul>
					</nav>
				</div>
			</header>
			<div className="mainApp">
				<Outlet />
			</div>
		</div>
	);
};

export default AppHeader;
