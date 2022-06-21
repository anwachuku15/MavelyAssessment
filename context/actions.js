import * as SecureStore from "expo-secure-store";
import { useStateValue } from "./StateProvider";
import { useLazyQuery, useMutation } from "@apollo/client";
import { SIGN_UP } from "../graphql/mutations";
import { GET_PRODUCTS } from "../graphql/queries";

import { client } from "../graphql/client";

export const SET_TOKEN = "SET_TOKEN";
export const SET_LOADING = "SET_LOADING";
export const SET_USER = "SET_USER";

export const logout = () => {
	client.resetStore();
	//
};

// export const authenticate = ()
