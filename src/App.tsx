import { memo } from "react";
import "./App.css";
import UserForm from "./Components/UserForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Dashboard from "./Components/Dashboard";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Dashboard />}></Route>
						<Route
							path={"new-user"}
							element={<UserForm isEditMode={false} />}
						></Route>
						<Route
							path={"edit-user"}
							element={<UserForm isEditMode={true} />}
						></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}
export default memo(App);
