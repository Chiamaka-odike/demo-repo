const products = [
  {
    id: 1,
    category: "Waffle",
    name: "Waffle with berries",
    price: 6.5,
    img_url: "images/image-waffle-desktop.jpg",
  },
  {
    id: 2,
    category: "Creme Brulee",
    name: "Vanilla Bean Creme Brulee",
    price: 7.0,
    img_url: "images/image-creme-brulee-desktop.jpg",
  },
  {
    id: 3,
    category: "Macaron",
    name: "Macaron Mix of five",
    price: 8.0,
    img_url: "images/image-macaron-desktop.jpg",
  },
  {
    id: 4,
    category: "Tiramisu",
    name: "ClassicTiramisu",
    price: 5.5,
    img_url: "images/image-tiramisu-desktop.jpg",
  },
  {
    id: 5,
    category: "Baklava",
    name: "Pistachio Baklava",
    price: 4.0,
    img_url: "images/image-baklava-desktop.jpg",
  },
  {
    id: 6,
    category: "Pie",
    name: "Lemon Meringue",
    price: 5.0,
    img_url: "images/image-meringue-desktop.jpg",
  },

  {
    id: 7,
    category: "Cake",
    name: "Red Velvet Cake",
    price: 4.5,
    img_url: "images/image-cake-desktop.jpg",
  },
  {
    id: 8,
    category: "Brownie",
    name: "Salted Caramel Brownie",
    price: 5.5,
    img_url: "images/image-brownie-desktop.jpg",
  },
  {
    id: 9,
    category: "Panna Cotta",
    name: "Vanilla Panna Cotta",
    price: 6.5,
    img_url: "images/image-panna-cotta-desktop.jpg",
  },
];

function displayProducts() {
  const productList = document.getElementById("productList");
  for (const product of products) {
    const productContainer = document.createElement("div");
    productContainer.classList.add("product");
    productContainer.innerHTML = `<img
                  src=${product.img_url}
                  alt="waffle"
                  width="150px"
                  class="dessert-image"
                  height="150px"
                />

                <button onclick="addToCart(${product.id})">
                  <img
                    src="images/icon-add-to-cart.svg"
                    alt=""
                    width="13px"
                  />Add to cart
                </button>

                <div class="description">
                  <p class="snack">${product.category}</p>
                  <p class="dessert-name">${product.name}</p>
                  <p class="amount">$${product.price}</p>
                </div>`;

    productList.appendChild(productContainer);
  }
}

var cart = {
  totalPrice: 0.0,
  totalQuantity: 0,
  products: [],
};
const cartList = document.getElementById("cartList");

function displayCarts() {
  cart.totalPrice = 0;
  cart.totalQuantity = 0;
  for (const product of cart.products) {
    const cartProduct = document.createElement("div");

    cartProduct.classList.add("cartProduct");
    cartProduct.innerHTML = `
    <div class="item">
    <p class="item-name">${product.name}</p>
    <p><span class="repeat">${product.quantity}x</span> @ $${product.price} $${
      product.price * product.quantity
    }</p></div> <button onclick="removeFromCart(${
      product.id
    })"><img src="images/icon-remove-item.svg" width="10px" alt=""></button>`;

    cartList.appendChild(cartProduct);
    cart.totalPrice += product.price * product.quantity;
    cart.totalQuantity += product.quantity;
  }
  const totalPrice = document.getElementById("dollar");
  totalPrice.innerText = "$" + cart.totalPrice;

  const cartQuantity = document.getElementById("cartQuantity");

  cartQuantity.innerText = "(" + cart.totalQuantity + ")";
}
function addToCart(id) {
  const productToAdd = products.find((product) => product.id == id);
  const existingProductIndex = cart.products.findIndex(
    (product) => product.id == productToAdd.id
  );
  if (existingProductIndex != -1) {
    cart.products[existingProductIndex].quantity += 1;
  } else {
    cart.products.push({ ...productToAdd, quantity: 1 });
  }

  /*cart.totalQuantity += 1;
  cart.totalPrice += productToAdd.price * 1;*/
  cartList.innerHTML = "";

  displayCarts(); // to refresh the browser
}
function removeFromCart(id) {
  cart.products = cart.products.filter((product) => product.id != id);
  cartList.innerHTML = ""; //to stop it from remebering the former products
  displayCarts();
}

const confirmButton = document.getElementById("Confirm");
const modal = document.querySelector(".modal");
const closeModalButton = document.getElementById("closeModal");

closeModalButton.addEventListener("click", function () {
  modal.classList.add("hide");
});
confirmButton.addEventListener("click", function () {
  if (cart.products.length == 0) {
    alert("Your cart is empty!");
  } else {
    modal.classList.remove("hide");
    displayModalProducts();
  }
});
function displayModalProducts() {
  const productList = document.getElementById("orderContent");
  productList.innerHTML = "";
  for (const product of cart.products) {
    const modalProduct = document.createElement("div");
    modalProduct.classList.add("modalProductContainer");
    modalProduct.innerHTML = `<div class="modalProductContent">
  <img src="${product.img_url}" alt="" />
  <div>
    <p>${product.name}</p>
    <p>${product.quantity} @$${product.price}</p>
  </div>
</div>
<div>$${product.quantity * product.price}</div>
`;
    
    productList.appendChild(modalProduct);
    // cartList.innerHTML = "";
    // displayCarts();
  }
  productList.innerHTML += `<div class="modalTotalPrice"><p>Order Total</p> <p>$${cart.totalPrice}</p></div>`;
}
displayProducts();
displayCarts();
