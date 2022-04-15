import Authorization, { toAuthorizationData } from "./Authorization";

interface jsonResult {
	userId: string;
	firstName: string;
	lastName: string;
	userGroup: string;
	userAuthorizations: Authorization[];
}

class User {
	private userId: string;
	private firstName: string;
	private lastName: string;
	private userGroup: string;
	private userAuthorizations: Authorization[];

	constructor(
		userId: string,
		first: string,
		last: string,
		authorization: string,
		permissions: Authorization[]
	) {
		this.userId = userId;
		this.firstName = first;
		this.lastName = last;
		this.userGroup = authorization;
		this.userAuthorizations = permissions;
	}

	public set setFirstName(val: string) {
		this.firstName = val;
	}

	public set setLastName(val: string) {
		this.lastName = val;
	}

	public set setUserGroup(val: string) {
		this.userGroup = val;
	}

	public set authorizations(val: Authorization[]) {
		this.userAuthorizations = val.length > 0 ? val : [];
	}
	public getUUID(): string {
		return this.userId;
	}
	public getFirstName(): string {
		return this.firstName;
	}
	public getLastName(): string {
		return this.lastName;
	}
	public getUserGroup(): string {
		return this.userGroup;
	}
	public getAuthorizations(): Authorization[] {
		return this.userAuthorizations;
	}
}

export const toUserData = (data: any[]) => {
	return data.map(
		(res: jsonResult) =>
			new User(
				res.userId,
				res.firstName,
				res.lastName,
				res.userGroup,
				toAuthorizationData(res.userAuthorizations)
			)
	);
};

export default User;
