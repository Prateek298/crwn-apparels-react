import React from 'react';

import './collectionItem.scss';

import CustomButton from '../customButton/customButton-comp';

const CollectionItem = ({ item, addItem }) => {
	const { imageUrl, name, price } = item;
	return (
		<div className="collection-item">
			<div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
			<div className="collection-footer">
				<span className="name">{name}</span>
				<span className="price">${price}</span>
			</div>
			<CustomButton onClick={() => addItem(item)} inverted>
				ADD TO CART
			</CustomButton>
		</div>
	);
};

export default CollectionItem;
