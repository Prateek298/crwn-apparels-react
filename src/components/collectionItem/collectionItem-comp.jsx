import React from 'react';
import { connect } from 'react-redux';

import './collectionItem.scss';

import { addItem } from '../../redux/cart/cart-actions';

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

const mapDispatchToProps = dispatch => ({
	addItem: item => dispatch(addItem(item))
});

export default connect(null, mapDispatchToProps)(CollectionItem);
