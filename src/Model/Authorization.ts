interface IAuthorizations {
	authorizationKey: string;
	granted: boolean;
}

class Authorization {
	private authorizationKey: string;
	private granted: boolean;

	constructor(authorizationKey: string, granted: boolean) {
		this.authorizationKey = authorizationKey;
		this.granted = granted;
	}

	public get getAuthorizationKey() {
		return this.authorizationKey;
	}
	public get getGranted() {
		return this.granted;
	}

	public setAuthorizationKey(val: string) {
		this.authorizationKey = val;
	}
	public setGranted(val: boolean) {
		this.granted = val;
	}
}

export const toAuthorizationData = (data: any[]) => {
	return data.map(
		(keyV: IAuthorizations) =>
			new Authorization(keyV.authorizationKey, keyV.granted)
	);
};

export default Authorization;
