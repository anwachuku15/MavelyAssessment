import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
	query Products {
		products {
			pageInfo {
				hasNextPage
			}
			edges {
				node {
					id
					brandId
					brandName
					name
					description
					image {
						alt
						id
						src
					}
				}
			}
			aggregate {
				count
			}
		}
	}
`;

export const SEARCH_PRODUCTS = gql`
	query Products($where: ProductWhereInput, $after: String) {
		products(where: $where, after: $after) {
			edges {
				node {
					brandId
					brandName
					id
					name
					description
					image {
						alt
						id
						src
					}
				}
				cursor
			}
			aggregate {
				count
			}
			pageInfo {
				hasNextPage
				endCursor
			}
		}
	}
`;

export const GET_CATEGORIES = gql`
	query Categories {
		categories {
			name
			image
		}
	}
`;
