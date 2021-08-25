import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Image from '../../assets/crown.svg';
import axios from 'axios';

import './stripe-button.styles.scss';
import { clearCart } from '../../redux/cart/cart.actions';
import {store} from '../../redux/store';

const StripeCheckoutButton = ({price, cartItems}) => {
    //stripe has to be in cents. Therefore we have to take dollars to penneis. so 5000 instead of 50
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51JI2jCIbgsmyqj4hV15J1OirmcjzT7P1criiti7GU88XhBLIJf78cw6cSbrtWN4n95LncA2jTRjQspVwfqaJoPvT00zjaSQZPe';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('Payment Successful');
            store.dispatch(clearCart());
        }).catch(error => {
            console.log('error with payment: ', JSON.parse(error));
            alert(
                'There was an issue with your payment. Please check your card information and try again.'
            );
        });
    };

    return (
        <StripeCheckout className='stripeButton'
            image = {Image}
            label = 'Pay Now'
            name = 'Crown Clothing Ltd.'
            billingAddress
            shippingAdress
            description={`Your Total is: $${price}`}       
            amount={priceForStripe}
            panelLabel = 'Pay Now'
            token = {onToken}
            stripeKey = {publishableKey}
        />
    );
};



export default (StripeCheckoutButton);