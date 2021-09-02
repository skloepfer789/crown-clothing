import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';

import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import {
    CartDropdownContainer,
    CartDropdownButton,
    EmptyMessageContainer,
    CartItemsContainer
  } from './cart-dropdown.styles';

import './cart-dropdown.style-tweak.scss';

  const CartDropdown = ({ cartItems, history, dispatch }) => (
    <CartDropdownContainer className='cart-dropdown'>
      <CartItemsContainer>
        {cartItems.length ? (
          cartItems.map(cartItem => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
        )}
      </CartItemsContainer>
        { //not original code, added a selective render of checkout button, only if cart has items
            cartItems.length ? (
                    <CartDropdownButton 
                        onClick={() => {
                            history.push('/checkout');
                            dispatch(toggleCartHidden());
                        }}
                    >GO TO CHECKOUT</CartDropdownButton>
            ):(
                null
            )
        }

        
    </CartDropdownContainer>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));