// fetch('https://gradistore-spi.herokuapp.com/products/all').then(function (response) {
// 	return response.json();
// }).then(function (data) {
// 	console.log(data);
// }).catch(function (err) {
// 	console.warn('Something went wrong.', err);
// });

fetch('https://gradistore-spi.herokuapp.com/products/all')
.then(response => response.json())
.then(data => {
    const products = data.products.nodes;
    const cardsContainer = document.querySelector('.cardsContainer')

    products.forEach(product => {
      const title = product.title;
      const tags = product.tags[0];
      const totalInventory = product.totalInventory;
      const tracksInventory = product.tracksInventory;
      const featuredImage = product.featuredImage.url;
      const maxPrice = product.prices.max.amount;
      const currency = product.prices.max.currencyCode;
      const minPrice = product.prices.min.amount;
      const productCard = document.createElement('div');
      productCard.classList.add('productCard');

      productCard.innerHTML = `
        <div class="imageContainer" style="${featuredImage}">
            <div class="discountTag"></div>
            <button class="productButton"><a href="" class="productLink">SEE MORE</a></button>
        </div>
        <span class="productName">${title}</span>
        <div class="productQuality">
            <div class="productStars">
                
            </div>
            <span>(${tags})</span>
        </div>
        <div class="priceContainer">
            <span class="regularPrice">€${maxPrice}</span>
            <span class="discountedPrice">€${minPrice}</span>
        </div>
      `;

      cardsContainer.appendChild(productCard);
      console.log(tags)
});
})
.catch(error => console.error(error));
