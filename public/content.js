// const products = document.querySelectorAll('a[href^="/vp/products/"]');
// products.forEach((product) => {
//   const priceTag = product.querySelector('span[class*="price"]:not([class*="discounted-price"])');
//   console.log(priceTag.innerHTML);
// });

// document.addEventListener("DOMContentLoaded", () => {

// });
// document
//   .querySelectorAll('a[href^="/vp/products/"] > span[class*="price"]:not([class*="discounted-price"])')
//   .forEach((priceTag) => {
//     console.log(priceTag.innerText);
//   });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "ajaxLoaded") {
    setTimeout(() => {
      scanProducts();
    }, 500);
  }
});

function scanProducts() {
  const priceElements = Array.from(
    document.querySelectorAll(
      'a[href^="/vp/products/"] span[class*="price"]:not([class*="discounted-price"])'
    )
  ).map((priceTag) => priceTag);

  const filteredElements = new Map();

  priceElements.forEach((priceTag) => {
    const price = Number(
      priceTag.innerText.replace("원", "").replaceAll(",", "")
    );
    const product = priceTag.closest("a");
    filteredElements.set(product, price);
  });

  filteredElements.forEach((price, product) => {
    if (isNaN(price)) {
      product.style.border = "2px solid yellow";
    }
    if (price > 50000) {
      product.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    }
  });
}
