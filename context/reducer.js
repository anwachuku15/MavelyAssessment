export const initialState = {
	token: null,
	user: null,
	isLoading: true,
	searchResults: [],
	queryInput: "",
	after: null,
};

export const reducer = (state, action) => {
	switch (action.type) {
		case "SET_TOKEN":
			return {
				...state,
				token: action.token,
			};
		case "SET_USER":
			return {
				...state,
				user: action.user,
			};
		case "SET_LOADING":
			return {
				...state,
				isLoading: action.isLoading,
			};
		case "FETCH":
			return {
				...state,
				searchResults: [...state.searchResults, ...action.searchResults],
				queryInput: action.queryInput,
			};
		// case "FETCH_MORE"
		case "SET_AFTER":
			return {
				...state,
				after: action.after,
			};
		case "CLEAR_RESULTS":
			return {
				...state,
				searchResults: [],
			};
		default:
			return state;
	}
};
