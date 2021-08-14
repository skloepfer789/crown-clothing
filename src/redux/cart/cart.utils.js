export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    );

    //if item exists, update quantity by 1
    if (existingCartItem) {
        return cartItems.map(cartItem => 
            cartItem.id === cartItemToAdd.id
            ? {...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
    }

    //adds quantity to items when stored, base of 1
    return [...cartItems, {...cartItemToAdd, quantity: 1}]
};