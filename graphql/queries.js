import { gql } from "@apollo/client";

export const getProducts = gql`
	query Products {
		products {
			edges {
				node {
					brandName
					name
					image {
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
