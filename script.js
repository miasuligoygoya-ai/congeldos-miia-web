document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product-card');
    const cartBtn = document.getElementById('cart-btn');

    products.forEach(product => {
        // Verifica si el producto tiene el selector de cantidad (para ensaladas, alfajores, etc.)
        const quantitySelector = product.querySelector('.quantity-selector');
        if (quantitySelector) {
            const incrementBtn = quantitySelector.querySelector('.increment-btn');
            const decrementBtn = quantitySelector.querySelector('.decrement-btn');
            const quantitySpan = quantitySelector.querySelector('.quantity');

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
        }
    });

    cartBtn.addEventListener('click', () => {
        let orderSummary = "¡Hola! Me gustaría hacer el siguiente pedido de congelados.miia:\n\n";
        let hasItems = false;

        products.forEach(product => {
            const productName = product.dataset.productName;
            
            // Revisa si es la sección de empanadas unificada
            if (productName === "Empanadas") {
                let empanadasOrder = '';
                let totalDozens = 0;
                
                const flavors = product.querySelectorAll('.flavor-select');
                flavors.forEach(flavor => {
                    const quantity = parseInt(flavor.value);
                    if (quantity > 0) {
                        const flavorName = flavor.id;
                        empanadasOrder += `* ${flavorName}: ${quantity} docena(s)\n`;
                        totalDozens += quantity;
                    }
                });
                
                if (totalDozens > 0) {
                    orderSummary += `* Empanadas (${totalDozens} docena(s) en total):\n${empanadasOrder}\n`;
                    hasItems = true;
                }

            } else { // Si no son empanadas, usa el contador de cantidad de los otros productos
                const quantityElement = product.querySelector('.quantity');
                if (quantityElement) {
                    const quantity = parseInt(quantityElement.textContent);
                    if (quantity > 0) {
                        orderSummary += `* ${productName}: ${quantity} unidad(es)\n`;
                        hasItems = true;
                    }
                }
            }
        });

        if (!hasItems) {
            alert('Por favor, selecciona al menos un producto.');
            return;
        }

        orderSummary += "\n¡Gracias!";

        // Reemplaza TUNUMERO con tu número de WhatsApp
        const whatsappUrl = `https://wa.me/5493777691594?text=${encodeURIComponent(orderSummary)}`;
        
        window.open(whatsappUrl, '_blank');
    });
});
