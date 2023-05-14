// fetch('https://gradistore-spi.herokuapp.com/products/all').then(function (response) {
// 	return response.json();
// }).then(function (data) {
// 	console.log(data);
// }).catch(function (err) {
// 	console.warn('Something went wrong.', err);
// });

fetch("https://gradistore-spi.herokuapp.com/products/all")
  .then((response) => response.json())
  .then((data) => {
    const products = data.products.nodes;
    const cardsContainer = document.querySelector(".cardsContainer");

    products.forEach((product) => {
      const title = product.title;
      const tags = product.tags[0];
      let stars;
      const totalInventory = product.totalInventory;
      const tracksInventory = product.tracksInventory;
      const featuredImage = product.featuredImage.url;
      const maxPrice = product.prices.max.amount;
      const currency = product.prices.max.currencyCode;
      const minPrice = product.prices.min.amount;

      let discount;
      discount = (maxPrice/minPrice)*100
      switch (true) {
        case tags <= 100:
          stars = 1;
          break;
        case 100 < tags <= 200:
          stars = 2;
          break;
        case 200 < tags <= 300:
          stars = 3;
          break;
        case 300 < tags <= 400:
          stars = 4;
          break;

        case 400 < tags <= 500:
          stars = 5;
          break;
      }
      console.log(stars)
      const productCard = document.createElement("div");
      productCard.classList.add("productCard");

      productCard.innerHTML = `
        <div class="imageContainer" style="background-image: url(${featuredImage})">
            <div class="discountTag">-${discount}%</div>
            <button class="productButton"><a href="#" class="productLink">SEE MORE</a></button>
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
    });
  })
  .catch((error) => console.error(error));
