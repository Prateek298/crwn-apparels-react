import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import CollectionPage from './collectionPage-comp';
import LoadingSpinner from '../../components/loadingSpinner/loadingSpinner-comp';

const GET_COLLECTION_BY_TITLE = gql`
	query getCollectionsByTitle($title: String!) {
		getCollectionsByTitle(title: $title) {
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

const CollectionPageContainer = ({ match }) => (
	<Query query={GET_COLLECTION_BY_TITLE} variables={{ title: match.params.collectionId }}>
		{({ loading, error, data }) => {
			if (error) console.log(error);
			return loading ? <LoadingSpinner /> : <CollectionPage collection={data.getCollectionsByTitle} />;
		}}
	</Query>
);

export default CollectionPageContainer;
