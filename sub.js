// Replace with your Stripe publishable key
const stripe = Stripe('your_publishable_key_here');

document.querySelectorAll('.subscribe-btn').forEach(button => {
    button.addEventListener('click', async (event) => {
        const plan = event.target.getAttribute('data-plan');
        
        // Send request to your server to create a checkout session
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ plan }),
        });

        const sessionId = await response.json();
        
        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({ sessionId: sessionId.id });
        
        if (result.error) {
            console.error(result.error.message);
        }
        
    });
});
