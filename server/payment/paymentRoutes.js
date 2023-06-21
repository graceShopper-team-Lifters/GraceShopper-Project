const express = require('express');
const router = express.Router();
const paypal = require('paypal-rest-sdk');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Configure PayPal
paypal.configure({
    'mode': 'sandbox', // Sandbox or live
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET
});

// Endpoint for Stripe payment
router.post('/pay-with-stripe', async (req, res) => {
    try {
        const { amount, currency, source } = req.body;
        const charge = await stripe.charges.create({
            amount,
            currency,
            source
        });
        res.json(charge);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint for PayPal payment
router.post('/pay-with-paypal', (req, res) => {
    const payment = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "amount": {
                "total": req.body.amount,
                "currency": req.body.currency
            },
            "description": req.body.description
        }]
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