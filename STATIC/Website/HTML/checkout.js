document.getElementById('checkoutForm').addEventListener('submit', function(e){
    e.preventDefaul();
    if (document.getElementById('recaptcha').checked){
        alert('Purchase complete! A confirmation email will be sent to you.');
        window.location.href="confirmation.html";
    } else {
        alert('Please confirm you are not a Robot');
    }
});
// Assuming you have a structure for your cart items and display areas
const cartItemsElement = document.getElementById('cartItems'); // Reference to the cart items container
const totalDisplay = document.createElement('p'); // Create a paragraph to display total
const hstRate = 0.13; // HST rate of 13%

// Function to calculate total with HST
function calculateTotal() {
    const itemElements = cartItemsElement.querySelectorAll('li'); // Get all list items in the cart
    let subtotal = 0;

    itemElements.forEach(item => {
        const itemText = item.textContent; // Get the text content of the item
        const priceMatch = itemText.match(/\$([0-9]+(?:\.[0-9]{2})?)/); // Match price pattern

        if (priceMatch) {
            const price = parseFloat(priceMatch[1]); // Parse the price
            subtotal += price; // Add to subtotal
        }
    });

    const hstAmount = subtotal * hstRate; // Calculate HST
    const total = subtotal + hstAmount; // Calculate total

    // Update total display
    totalDisplay.textContent = `Total: $${total.toFixed(2)} (HST: $${hstAmount.toFixed(2)})`;
    cartItemsElement.appendChild(totalDisplay); // Append total to the cart items section
}

// Initial call to calculate the total on page load
document.addEventListener('DOMContentLoaded', calculateTotal);
