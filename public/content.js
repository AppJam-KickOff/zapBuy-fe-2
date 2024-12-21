document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    scanProducts();
  }, 3000);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "ajaxLoaded") {
    setTimeout(() => {
      scanProducts();
    }, 500);
  } else if (message.action === "cartLoading") {
    setTimeout(() => {
      scanCart();
      document.querySelector("#btnPay").addEventListener("click", (e) => {
        e.preventDefault();
      });
    }, 500);
  }
});

function scanProducts() {
  const products = document.querySelectorAll('a[href^="/vp/products/"]');

  const priceElements = [];
  products.forEach((product) => {
    let priceTag = product.querySelector(".price-value");
    if (!priceTag) {
      priceTag = product.querySelector(
        'span[class*="price"]:not([class*="discounted-price"]:not([class*="price-info"])'
      );
    }
    if (priceTag) priceElements.push(priceTag);
  });
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

function scanCart() {
  const items = document.querySelectorAll(".cart-deal-item");

  const itemMap = new Map();

  items.forEach((item) => {
    const priceTag = item.querySelector(".price-value");
    const price = Number(
      priceTag.innerText.replace("원", "").replaceAll(",", "")
    );

    const itemName = item.querySelector(".product-name").innerText;

    itemMap.set(itemName, price);
  });

  document.querySelector("#btnPay").addEventListener("click", (e) => {
    e.preventDefault();
    let totalPrice = 0;
    itemMap.forEach((price) => {
      totalPrice += price;
    });

    alert(`총 가격: ${totalPrice}원`);
  });
}

function showModal(item, price) {
  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0,0,0,0.5)";
  modal.style.display = "flex";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";

  const content = document.createElement("div");
  content.style.width = "80%";
  content.style.height = "80%";
  content.style.backgroundColor = "white";
  content.style.borderRadius = "10px";
  content.style.display = "flex";
  content.style.flexDirection = "column";
  content.style.justifyContent = "center";
  content.style.alignItems = "center";

  const title = document.createElement("h1");
  title.innerText = item;
  title.style.fontSize = "24px";
  title.style.fontWeight = "bold";

  const priceTag = document.createElement("p");
  priceTag.innerText = price + "원";
  priceTag.style.fontSize = "20px";

  const closeBtn = document.createElement("button");
  closeBtn.innerText = "닫기";
  closeBtn.style.width = "100px";
  closeBtn.style.height = "40px";
  closeBtn.style.backgroundColor = "black";
  closeBtn.style.color = "white";
  closeBtn.style.border = "none";
  closeBtn.style.borderRadius = "5px";
  closeBtn.style.cursor = "pointer";

  closeBtn.addEventListener("click", () => {
    modal.remove();
  });

  content.appendChild(title);
  content.appendChild(priceTag);
  content.appendChild(closeBtn);

  modal.appendChild(content);

  document.body.appendChild(modal);
}
