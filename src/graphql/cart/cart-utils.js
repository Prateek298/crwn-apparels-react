// Adds new item to cart preventing duplicate entries and generating new cartItems array for state to change so that only required component re-renders
export const addItemToCart = (cartItems, cartItemToAdd) => {
	const existingItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

	if (existingItem) {
		return cartItems.map(
			cartItem => (cartItem.id === cartItemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
		);
	}

	return [ ...cartItems, { ...cartItemToAdd, quantity: 1 } ];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
	const existingItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

	if (existingItem.quantity === 1) {
		return clearItemFromCart(cartItems, cartItemToRemove);
	}

	if (existingItem) {
		return cartItems.map(
			cartItem =>
				cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
		);
	}
};

export const clearItemFromCart = (cartItems, cartItemToClear) =>
	cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);

export const getCartItemsCount = cartItems => cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0);

export const getCartTotal = cartItems =>
	cartItems.reduce((acc, cartItem) => acc + cartItem.quantity * cartItem.price, 0);
