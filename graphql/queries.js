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
					categories {
						name
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

export const GET_TRENDING = gql`
	query TrendingProducts {
		trendingProducts {
			brandId
			brandName
			id
			name
			categories {
				name
			}
			description
			isTrending
			thumbnail
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
