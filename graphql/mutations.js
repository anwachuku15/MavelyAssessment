import { gql } from "@apollo/client";

export const SIGN_UP = gql`
	mutation Signup($data: SignupInput!) {
		signup(data: $data) {
			email
			name
			id
			token
			refreshToken
		}
	}
`;

export const LOG_IN = gql`
	mutation Login($data: LoginInput!) {
		login(data: $data) {
			id
			email
			name
			refreshToken
			token
		}
	}
`;
