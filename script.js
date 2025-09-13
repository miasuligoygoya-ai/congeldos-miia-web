document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product-card');
    const cartBtn = document.getElementById('cart-btn');

    products.forEach(product => {
        const incrementBtn = product.querySelector('.increment-btn');
        const decrementBtn = product.querySelector('.decrement-btn');
        const quantitySpan = product.querySelector('.quantity');

        incrementBtn.addEventListener('click', () => {
            let quantity = parseInt(quantitySpan.textContent);
            quantity++;
            quantitySpan.textContent = quantity;
        });

        decrementBtn.addEventListener('click', () => {
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 0) {
                quantity--;
                quantitySpan.textContent = quantity;
            }
        });
    });

    cartBtn.addEventListener('click', () => {
        let orderSummary = "¡Hola! Me gustaría hacer el siguiente pedido de congelados.miia:\n\n";
        let hasItems = false;

        products.forEach(product => {
            const productName = product.dataset.productName;
            const quantity = parseInt(product.querySelector('.quantity').textContent);

            if (quantity > 0) {
                orderSummary += `* ${productName}: ${quantity}\n`;
                hasItems = true;
            }
        });

        if (!hasItems) {
            alert('Por favor, selecciona al menos un producto.');
            return;
        }

        orderSummary += "\n¡Gracias!";

        const encodedMessage = encodeURIComponent(orderSummary);
        const whatsappUrl = `https://wa.me/5493777691594?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    });
});