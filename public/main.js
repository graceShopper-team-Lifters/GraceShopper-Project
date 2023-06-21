document.getElementById('payment-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const amount = document.getElementById('amount').value;
    const currency = document.getElementById('currency').value;
    const source = document.getElementById('source').value;
  
    try {
      const response = await fetch('/payment/pay-with-stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency, source }),
      });
      const data = await response.json();
      console.log('Stripe Payment successful:', data);
    } catch (error) {
      console.error('Stripe Payment Error:', error);
    }
  });
  
  document.getElementById('paypal-button').addEventListener('click', async () => {
    const amount = '10.00'; // Set the amount as needed
    const currency = 'USD'; // Set the currency as needed
    const description = 'Description for your payment';
  
    try {
      const response = await fetch('/payment/pay-with-paypal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency, description }),
      });
      const data = await response.json();
      if (data.approval_url) {
        window.location.href = data.approval_url;
      }
    } catch (error) {
      console.error('PayPal Payment Error:', error);
    }
  });