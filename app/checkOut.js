import { loadStripe } from '@stripe/stripe-js';
import React from 'react'

export async function checkOut({ lineItems }) {

    const redirectToCheckout = async () => {
    const stripe = await loadStripe(process.env.STRIPE_PUBLIC_KEY);
    
    const { error } = await stripe.redirectToCheckout({
      mode: 'payment',
      lineItems,
      successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: window.location.origin
    });

    if (error) {
      console.error('Error redirecting to checkout:', error);
    }
  }


}
