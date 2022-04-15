import { ModeEditOutline } from "@mui/icons-material";
import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	IconButton,
} from "@mui/material";
import { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User } from "../Model";
import { fetchData } from "../Service/UserAPI";
import { storeActions, StateOfApp } from "../Utils";
import LoadingScreen from "./Loading";

import "./styles/dashboard.scss";

const Dashboard = () => {
	const loading = useSelector((state: StateOfApp) => state.loading);
	const userData = useSelector((state: StateOfApp) => state.data);
	const tableColums = ["First Name", "Last Name", "Actions"];
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);

	const actionButton = (user: User) => {
		return (
			<IconButton
				className="tableCell"
				aria-label="edit"
				onClick={() => {
					dispatch(storeActions.setSelectedId(user.getUUID(), user));
					navigate("/edit-user");
				}}
			>
				<ModeEditOutline />
			</IconButton>
		);
	};

	const generateTableBody = () => {
		return (
			<TableBody>
				{userData.length !== 0 &&
					userData.map((user: User) => {
						return (
							<TableRow key={user.getUUID()}>
								<TableCell align="left" className="tableCell">
									{user.getFirstName()}
								</TableCell>
								<TableCell className="tableCell" align="left">
									{user.getLastName()}
								</TableCell>

								<TableCell className="tableCell">
									{actionButton(user)}
								</TableCell>
							</TableRow>
						);
					})}
			</TableBody>
		);
	};

	return (
		<div>
			{loading ? (
				<LoadingScreen />
			) : (
				<TableContainer className="table-wrapper" component={Paper}>
					<Table className="mainTable">
						<TableHead className="table-head">
							<TableRow>
								{tableColums.map((columnName, index) => {
									return (
										<TableCell
											className="tableCell"
											key={index}
										>
											{columnName}
										</TableCell>
									);
								})}
							</TableRow>
						</TableHead>
						{generateTableBody()}
					</Table>
				</TableContainer>
			)}
		</div>
	);
};

export default memo(Dashboard);
