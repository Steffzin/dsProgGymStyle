document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

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