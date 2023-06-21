const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const paypal = require('paypal-rest-sdk');

// Configure Stripe
stripe.setApiVersion('2020-08-27');
stripe.setAppInfo({
  name: 'Your Application Name',
  version: '1.0.0',
});

// Configure PayPal
paypal.configure({
  mode: 'sandbox',
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

// Stripe payment route
router.post('/pay-with-stripe', async (req, res) => {
  try {
    const { amount, currency, source } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: source,
      confirm: true,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PayPal payment route
router.post('/pay-with-paypal', (req, res) => {
  const { amount, currency } = req.body;

  const payment = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    transactions: [
      {
        amount: {
          total: amount,
          currency: currency,
        },
      },
    ],
    redirect_urls: {
      return_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    },
  };

  paypal.payment.create(payment, (error, payment) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      for (let link of payment.links) {
        if (link.rel === 'approval_url') {
          res.json({ approval_url: link.href });
          break;
        }
      }
    }
  });
});

module.exports = router;