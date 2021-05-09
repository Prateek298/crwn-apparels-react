import React from 'react';
import { useDispatch } from 'react-redux';

import './collectionItem.scss';

import { addItem } from '../../redux/cart/cart-actions';

import CustomButton from '../customButton/customButton-comp';

const CollectionItem = ({ item, onPreview }) => {
	const dispatch = useDispatch();
	const { imageUrl, name, price } = item;

	return (
		<div className={`${onPreview ? 'previewWidth' : ''} collection-item`}>
			<div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
			<div className="collection-footer">
				<span className="name">{name}</span>
				<span className="price">${price}</span>
			</div>
			<CustomButton onClick={() => dispatch(addItem(item))} inverted>
				ADD TO CART
			</CustomButton>
		</div>
	);
};

export default CollectionItem;
