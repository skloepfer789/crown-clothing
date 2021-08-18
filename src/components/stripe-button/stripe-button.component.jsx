import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Image from '../../assets/crown.svg';

import './stripe-button.styles.scss';

const StripeCheckoutButton = ({price}) => {
    //stripe has to be in cents. Therefore we have to take dollars to penneis. so 5000 instead of 50
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51JI2jCIbgsmyqj4hV15J1OirmcjzT7P1criiti7GU88XhBLIJf78cw6cSbrtWN4n95LncA2jTRjQspVwfqaJoPvT00zjaSQZPe';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

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
            //token is the success event that triggers on submission
            token = {onToken}
            stripeKey = {publishableKey}
        />
    );
};

export default StripeCheckoutButton;