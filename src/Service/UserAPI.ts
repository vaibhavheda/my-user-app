import User, { toUserData } from "../Model/User";
import { storeActions } from "../Utils/StoreActions";

export const fetchData = () => {
	return async (dispatch: any) => {
		dispatch(storeActions.loadingBegin());
		fetch("http://localhost:3001/")
			.then((response) => response.json())
			.then((res) => {
				dispatch(storeActions.loadingSuccess(toUserData(res)));
			});
	};
};

export const saveDataById = (newUser: User, id: string) => {
	const requestOptions = {
		method: "PUT",
		headers: { "Content-Type": "application/json", id: id },
		body: JSON.stringify(newUser),
	};
	fetch(`http://localhost:3001/edit-user`, requestOptions)
		.then((res) => res.json())
		.then(console.log);
};

export const saveData = (data: User) => {
	return fetch("http://localhost:3001/new-user", {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
};
