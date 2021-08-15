import { createSelector } from 'reselect';

const selectCart = state => state.cart;

//memoized selector. Caching the information, to reuse without rerendering if the specific state (cart) doesn't change. This way if a user logs out and calls StateToProps, it doesn't rerender the cart and eat up a lot of time.
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);

//count total quantity to add in the cart. Add reselect to keep this from rerendering at all state changes. here we will memoize the information, to cache the count, UNLESS the count changes.
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => 
        cartItems.reduce(
        (accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity, 0
   )
);