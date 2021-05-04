import React, { useState } from 'react';

import { firestore } from '../../firebaseConfig';

import './addToShop.scss';

import FormInput from '../formInput/formInput-comp';
import CustomButton from '../customButton/customButton-comp';

const AddToShop = () => {
	const [ itemInfo, setItemInfo ] = useState({
		itemName: '',
		itemId: '',
		imageUrl: '',
		price: '',
		category: null
	});

	const { itemName, itemId, imageUrl, price, category } = itemInfo;

	const handleSubmit = async e => {
		try {
			e.preventDefault();

			const collectionSnap = await firestore.collection('collections').where('title', '==', category).get();
			const collection = collectionSnap.docs[0];
			await firestore.doc(`collections/${collection.id}`).set({
				...collection.data(),
				items: [ ...collection.data().items, { name: itemName, id: +itemId, imageUrl, price: +price } ]
			});
			setItemInfo({
				itemName: '',
				itemId: '',
				imageUrl: '',
				price: '',
				category: null
			});
			alert('Item added');
		} catch (err) {
			alert('Item was not added');
			console.log(err);
		}
	};

	const handleChange = e => {
		const { name, value } = e.target;
		setItemInfo({ ...itemInfo, [name]: value });
	};

	return (
		<div className="addToShop">
			<h2 className="title">Modify the Catalog</h2>
			<form onSubmit={handleSubmit}>
				<FormInput
					type="text"
					name="itemName"
					value={itemName}
					onChange={handleChange}
					label="Product Name"
					required
				/>
				<FormInput
					type="number"
					name="itemId"
					value={itemId}
					onChange={handleChange}
					label="Product ID"
					required
				/>
				<FormInput
					type="text"
					name="imageUrl"
					value={imageUrl}
					onChange={handleChange}
					label="Image URL of the product"
					required
				/>
				<FormInput type="number" name="price" value={price} onChange={handleChange} label="Price" required />
				<div className="category-options">
					<div>
						<label htmlFor="hats">Hats</label>
						<input id="hats" type="radio" name="category" value="Hats" onChange={handleChange} required />
					</div>
					<div>
						<label htmlFor="jackets">Jackets</label>
						<input
							id="jackets"
							type="radio"
							name="category"
							value="Jackets"
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label htmlFor="sneakers">Sneakers</label>
						<input
							id="sneakers"
							type="radio"
							name="category"
							value="Sneakers"
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label htmlFor="womens">Womens</label>
						<input
							id="womens"
							type="radio"
							name="category"
							value="Womens"
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label htmlFor="mens">Mens</label>
						<input id="mens" type="radio" name="category" value="Mens" onChange={handleChange} required />
					</div>
				</div>
				<CustomButton type="submit">ADD PRODUCT</CustomButton>
			</form>
		</div>
	);
};

export default AddToShop;
