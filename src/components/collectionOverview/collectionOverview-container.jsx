import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import CollectionsOverview from './collectionOverview-comp';
import LoadingSpinner from '../loadingSpinner/loadingSpinner-comp';

const GET_COLLECTIONS = gql`
	{
		collections {
			id
			title
			items {
				id
				name
				price
				imageUrl
			}
		}
	}
`;

const CollectionsOverviewContainer = () => (
	<Query query={GET_COLLECTIONS}>
		{({ loading, error, data }) => {
			if (loading) return <LoadingSpinner />;
			if (error) console.log(error);
			return <CollectionsOverview collections={data.collections} />;
		}}
	</Query>
);

export default CollectionsOverviewContainer;
