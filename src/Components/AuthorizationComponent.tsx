import { MenuItem, Select } from "@mui/material";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Authorization, User } from "../Model";
import { storeActions, StateOfApp } from "../Utils";
import { saveDataById } from "../Service/UserAPI";
import LoadingScreen from "./Loading";

import "./styles/mainfile.scss";

const groupOptions = ["Operator", "Administrator", "Service"];
const userPermissions = ["jumping", "standing", "sitting", "running"];
interface IAuthorizeCompProps {
	isEditMode: boolean;
}
const AuthorizationComp = (props: IAuthorizeCompProps) => {
	const dispatch = useDispatch();

	const loading = useSelector((state: StateOfApp) => state.loading);
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
	const selectedEntity = useSelector(
		(state: StateOfApp) => state.selectedEntity
	);

	const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (props.isEditMode) {
			const newPerm = permissions.filter(
				(per) => per.getAuthorizationKey !== e.target.value
			);
			newPerm.push(new Authorization(e.target.value, e.target.checked));
			const newUser = new User(
				selectedEntity?.getUUID() !== undefined
					? selectedEntity?.getUUID()
					: "",
				first,
				last,
				authorization,
				newPerm
			);
			saveDataById(
				newUser,
				selectedEntity?.getUUID() !== undefined
					? selectedEntity?.getUUID()
					: ""
			);
			dispatch(storeActions.setSelectedEntity(newUser));
		} else {
			dispatch(
				storeActions.setPermissions(
					new Authorization(e.target.value, e.target.checked),
					e.target.value
				)
			);
		}
	};

	const createAuthorizationCheckBoxes = () => {
		return (
			<>
				{userPermissions.map((per) => (
					<div key={per} className={"checkbox"}>
						<input
							type="checkbox"
							id={per}
							name={per}
							value={per}
							checked={
								permissions.find(
									(val) => val.getAuthorizationKey === per
								)?.getGranted
							}
							onChange={handleCheckBoxChange}
						/>
						<label> {per}</label>
					</div>
				))}
			</>
		);
	};

	return (
		<div className="authorizeWrapper">
			{loading ? (
				<LoadingScreen />
			) : (
				<div>
					<div className="InputField">
						<span>Groups</span>
						<Select
							labelId="group-drop-down"
							id="group-drop"
							value={authorization}
							onChange={(e) => {
								if (props.isEditMode) {
									const newUser = new User(
										selectedEntity?.getUUID() !== undefined
											? selectedEntity?.getUUID()
											: "",
										first,
										last,
										e.target.value,
										permissions
									);
									saveDataById(
										newUser,
										selectedEntity?.getUUID() !== undefined
											? selectedEntity?.getUUID()
											: ""
									);
									dispatch(
										storeActions.setSelectedEntity(newUser)
									);
								} else {
									dispatch(
										storeActions.setAuthorizationGroup(
											e.target.value
										)
									);
								}
							}}
						>
							{groupOptions.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</Select>
					</div>
					<div className="InputField checkboxwrapper">
						<span>Permissions</span>
						{createAuthorizationCheckBoxes()}
					</div>
				</div>
			)}
		</div>
	);
};

export default memo(AuthorizationComp);
