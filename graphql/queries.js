import { gql } from "@apollo/client";

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
