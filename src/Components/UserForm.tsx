import { Input, Paper } from "@mui/material";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../Model";
import { storeActions, StateOfApp, create_UUID } from "../Utils";
import AuthorizeComp from "./AuthorizationComponent";
import "./styles/mainfile.scss";
import { saveData } from "../Service/UserAPI";

interface IUserFormInteface {
	isEditMode: boolean;
}

const UserForm = (props: IUserFormInteface) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const first = useSelector((state: StateOfApp) =>
		props.isEditMode && state.selectedEntity !== undefined
			? state.selectedEntity.getFirstName()
			: state.first
	);
	const last = useSelector((state: StateOfApp) =>
		props.isEditMode && state.selectedEntity !== undefined
			? state.selectedEntity.getLastName()
			: state.last
	);
	const authorization = useSelector((state: StateOfApp) =>
		props.isEditMode && state.selectedEntity !== undefined
			? state.selectedEntity.getUserGroup()
			: state.authorization
	);

	const permissions = useSelector((state: StateOfApp) =>
		props.isEditMode && state.selectedEntity !== undefined
			? state.selectedEntity.getAuthorizations()
			: state.permissions
	);

	return (
		<div className="mainform">
			<h1 className="ceter">
				{(props.isEditMode ? "Edit " : "New ") + "Form"}
			</h1>
			<Paper className="mainform-inner" elevation={10}>
				<div className="InputField">
					<span>First Name &nbsp;</span>
					<Input
						disabled={props.isEditMode}
						value={first}
						name={"last"}
						onChange={(e) => {
							dispatch(storeActions.setFirstName(e.target.value));
						}}
					/>
				</div>
				<div className="InputField">
					<span>Last Name &nbsp;</span>
					<Input
						disabled={props.isEditMode}
						value={last}
						name={"last"}
						onChange={(e) => {
							dispatch(storeActions.setLastName(e.target.value));
						}}
					/>
				</div>
				<div className="InputField authorizations">
					<span>Authorizations</span>
					<AuthorizeComp
						isEditMode={props.isEditMode}
					></AuthorizeComp>
				</div>
				{!props.isEditMode && (
					<div>
						<button
							className="button"
							onClick={() => {
								if (props.isEditMode === false) {
									let newUser = new User(
										create_UUID(),
										first,
										last,
										authorization,
										permissions
									);
									saveData(newUser)
										.then((res) => res.json())
										.then((user) => {
											dispatch(
												// to reset Fields
												storeActions.revertToPrevious()
											);
											navigate("/");
										});
								}
							}}
						>
							Save
						</button>
						<button
							className="button"
							onClick={() => {
								if (props.isEditMode === false) {
									dispatch(storeActions.revertToPrevious());
									navigate("/");
								}
							}}
						>
							Cancel
						</button>
					</div>
				)}
			</Paper>
		</div>
	);
};

export default memo(UserForm);
