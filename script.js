document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const addToCartButton = document.getElementById('add-to-cart');


    prevButton.addEventListener('click', function() {
        carousel.scrollBy({
            left: -carousel.clientWidth,
            behavior: 'smooth'
        });
    });

    nextButton.addEventListener('click', function() {
        carousel.scrollBy({
            left: carousel.clientWidth,
            behavior: 'smooth'
        });
    });

    if (addToCartButton) {
        addToCartButton.addEventListener('click', function() {
            const product = {
                name: this.getAttribute('data-name'),
                price: this.getAttribute('data-price'),
                image: this.getAttribute('data-image')
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const products = document.querySelectorAll('.product');

    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();

        products.forEach(product => {
            const productName = product.querySelector('h2').textContent.toLowerCase();
            if (productName.includes(query)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
});


/*to testando essa parte do carrinho!*/

function increaseQuantity(button) {
    const quantityElement = button.previousElementSibling;
    let quantity = parseInt(quantityElement.textContent);
    quantity++;
    quantityElement.textContent = quantity;
    updateSummary();
}

function decreaseQuantity(button) {
    const quantityElement = button.nextElementSibling;
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity;
        updateSummary();
    }
}

function removeItem(button) {
    const cartItem = button.closest('.cart-item');
    cartItem.remove();
    updateSummary();
}

function updateSummary() {
    const cartItems = document.querySelectorAll('.cart-item');
    let itemCount = 0;
    let subtotal = 0;

    cartItems.forEach(item => {
        const quantity = parseInt(item.querySelector('.quantity').textContent);
        const priceText = item.querySelector('.price').textContent.replace('R$', '').replace(',', '.');
        const price = parseFloat(priceText) || 0;

        itemCount += quantity;
        subtotal += quantity * price;
    });

    document.querySelector('.item-count').textContent = itemCount;
    document.querySelector('.subtotal').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    document.querySelector('.total').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
}

document.addEventListener('DOMContentLoaded', () => {
    updateSummary();
});
