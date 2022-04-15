import { Authorization, User } from "../Model";
import { actionStrings } from "./StoreActions";

export interface StateOfApp {
	loading: boolean;
	data: User[];
	error: string;
	selectedEditId?: string;
	first: string;
	last: string;
	authorization: string;
	permissions: Authorization[];
	selectedEntity?: User;
}

const initialState: StateOfApp = {
	loading: false,
	data: [],
	error: "",
	selectedEditId: undefined,
	first: "",
	last: "",
	authorization: "Operator",
	permissions: [
		new Authorization("jumping", false),
		new Authorization("standing", false),
		new Authorization("sitting", false),
		new Authorization("running", false),
	],
	selectedEntity: undefined,
};

const reducer = (state = initialState, actions: any) => {
	switch (actions.type) {
		case actionStrings.fetchBegin:
			return {
				...state,
				loading: true,
			};
		case actionStrings.fetchSuccess:
			return {
				...state,
				loading: false,
				data: actions.payload.data,
				selectedEntity: undefined,
				selectedEditId: undefined,
			};
		case actionStrings.fetchFailure:
			return {
				...state,
				loading: false,
				error: actions.payload.error,
			};
		case actionStrings.editFetchSuccess:
			return {
				...state,
				loading: false,
				selectedEntity: actions.payload.data,
			};
		case actionStrings.setSelectedEntity:
			return {
				...state,
				selectedEntity: actions.payload.data,
				loading: false,
			};
		case actionStrings.setSelectedId:
			return {
				...state,
				selectedEditId: actions.payload.data,
				selectedEntity: actions.payload.user,
			};
		case actionStrings.setFirst:
			return {
				...state,
				first: actions.payload.data,
			};
		case actionStrings.setLast:
			return {
				...state,
				last: actions.payload.data,
			};
		case actionStrings.setAuthorization:
			return {
				...state,
				authorization: actions.payload.data,
			};
		case actionStrings.revertPrevious:
			return {
				...state,
				first: "",
				last: "",
				authorization: "Operator",
				permissions: [
					new Authorization("jumping", false),
					new Authorization("standing", false),
					new Authorization("sitting", false),
					new Authorization("running", false),
				],
				selectedEntity: undefined,
			};
		case actionStrings.setPermissions: {
			const newPermissions = state.permissions.filter(
				(per) => per.getAuthorizationKey !== actions.payload.key
			);
			newPermissions.push(actions.payload.data);
			return {
				...state,
				permissions: newPermissions,
			};
		}
		default:
			return state;
	}
};

export default reducer;
