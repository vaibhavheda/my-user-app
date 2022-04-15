import { Authorization, User } from "../Model";

export const actionStrings = {
	fetchBegin: "FETCH_BEGIN",
	fetchSuccess: "FETCH_SUCCESS",
	editFetchSuccess: "EDIT_FETCH_SUCCESS",
	fetchFailure: "FETCH_FAILURE",
	toggleEdit: "TOGGLE_EDIT",
	revertPrevious: "REVERT_PREVIOUS",
	setUserData: "SET_USER_DATA",
	setFirst: "SET_FIRST",
	setLast: "SET_LAST",
	setPermissions: "SET_PERMISSIONS",
	setAuthorization: "SET_AUTHORIZATION",
	setSelectedEntity: "SET_SELECTED_ENTITY",
	setSelectedId: "SET_SELECTED_ID",
};

const loadingBegin = () => ({
	type: actionStrings.fetchBegin,
});

const loadingSuccess = (data: User[]) => ({
	type: actionStrings.fetchSuccess,
	payload: { data },
});

const editLoadingSuccess = (data: User) => ({
	type: actionStrings.editFetchSuccess,
	payload: { data },
});

const loadingFailure = (error: String) => ({
	type: actionStrings.fetchFailure,
	payload: { error },
});

const toggleEditMode = (id: number) => ({
	type: actionStrings.toggleEdit,
	payload: { id },
});

const revertToPrevious = () => ({
	type: actionStrings.revertPrevious,
});

const saveEditData = () => ({
	type: actionStrings.setUserData,
});

const setFirstName = (data: string) => ({
	type: actionStrings.setFirst,
	payload: { data },
});

const setSelectedEntity = (data: User) => ({
	type: actionStrings.setSelectedEntity,
	payload: { data },
});

const setLastName = (data: string) => ({
	type: actionStrings.setLast,
	payload: { data },
});

const setSelectedId = (data: string, user: User) => ({
	type: actionStrings.setSelectedId,
	payload: { data, user },
});

const setAuthorizationGroup = (data: string) => ({
	type: actionStrings.setAuthorization,
	payload: { data },
});

const setPermissions = (data: Authorization, key: string) => ({
	type: actionStrings.setPermissions,
	payload: { data, key },
});

export const storeActions = {
	loadingBegin,
	loadingSuccess,
	loadingFailure,
	toggleEditMode,
	revertToPrevious,
	saveEditData,
	setFirstName,
	setLastName,
	setAuthorizationGroup,
	setPermissions,
	setSelectedEntity,
	editLoadingSuccess,
	setSelectedId,
};
