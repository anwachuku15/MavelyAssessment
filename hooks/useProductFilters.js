import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

export default function useProductFilters() {
	const [filters, _updateFilter] = useState({
		id: undefined,
		name: undefined,
	});

	const updateFilter = (filterType, value) => {
		_updateFilter({
			[filterType]: value,
		});
	};

	return {
		models: { filters },
		operations: { updateFilter },
	};
}
