/* Function to fetch the product information */

function fetchAPI() {
  fetch("https://gradistore-spi.herokuapp.com/products/all")
    .then((response) => response.json())
    .then((data) => {
      const products = data.products.nodes;
      const cardsContainer = document.querySelector(".cardsContainer");

      products.forEach((product) => {
        const title = product.title;
        const tags = product.tags[0];
        let stars;
        const featuredImage = product.featuredImage.url;
        const maxPrice = product.prices.max.amount;
        const currency = product.prices.max.currencyCode;
        const minPrice = product.prices.min.amount;

        let discount;
        discount = ((maxPrice - minPrice) / maxPrice) * 100;
        switch (true) {
          case tags <= 100:
            stars = 1;
            break;
          case tags > 100 && tags <= 200:
            stars = 2;
            break;
          case tags > 200 && tags <= 300:
            stars = 3;
            break;
          case tags > 300 && tags <= 400:
            stars = 4;
            break;
          case tags > 400 && tags <= 500:
            stars = 5;
            break;
          default:
            stars = 5;
            break;
        }

        const numberOfStars = stars;
        let starCount = "";
        for (let i = 0; i < numberOfStars; i++) {
          starCount += '<img src="img/product-star.svg" alt="" class="star">';
        }

        const productCard = document.createElement("div");
        productCard.classList.add("productCard");
        productCard.innerHTML = `
        <div class="imageContainer" style="background-image: url(${featuredImage})">
            ${
              discount >= 1
                ? `<div class="discountTag">-${discount}%</div>`
                : ""
            }
            <button class="productButton"><a href="#" class="productLink">SEE MORE</a></button>
        </div>
        <span class="productName">${title}</span>
        <div class="productInformation">
          <div class="productQuality">
              <div class="productStars">
                ${starCount}
              </div>
              <span>(${tags})</span>
          </div>
          <div class="priceContainer">
              ${
                maxPrice >= minPrice
                  ? ""
                  : `<span class="regularPrice">€${maxPrice}</span>`
              }
              <span class="discountedPrice">€${minPrice}</span>
          </div>
        </div>
      `;

        cardsContainer.appendChild(productCard);
      });
    })
    .catch((error) => console.error(error));
}

document.addEventListener("DOMContentLoaded", fetchAPI);

/* function to get the carrousel movement with the click */

function slideProduct() {
  const slider = document.querySelector(".cardsContainer");
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });
  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });
  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3;
    slider.scrollLeft = scrollLeft - walk;
  });
}

document.addEventListener("DOMContentLoaded", slideProduct);


/* function to validate the email for the newsletter */

function validateEmail(){

  const email = document.getElementById('emailNewsletter')
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if(email.value.match(mailformat)){
    alert("Valid Email");
    return true;
  }

  else{
    alert("Email not valid");
    return false;
  }

}

/* function to make the pagination of the products */

function moveCards(direction) {
  var container = document.querySelector('.cardsContainer');
  var scrollDistance = container.clientWidth * 0.8;
  var currentScroll = container.scrollLeft;
  
  if (direction === 'left') {
    container.scrollTo({
      left: currentScroll - scrollDistance,
      behavior: 'smooth'
    });
  } else if (direction === 'right') {
    container.scrollTo({
      left: currentScroll + scrollDistance,
      behavior: 'smooth'
    });
  }
}

