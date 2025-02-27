const emptyCart = {
  totalPrice: 0.0,
  totalQuantity: 0,
  products: [],
};
var storedCart = localStorage.getItem("cart");
var cart;
if (storedCart) {
  cart = JSON.parse(storedCart);
} else {
  cart = emptyCart;
}

function displayProducts() {
  const productList = document.getElementById("productList");
  productList.innerHTML = ""; //clears the product list before displaying the updated cart items
  cart.products.forEach((product, index) => {
    const productContainer = document.createElement("div");
    productContainer.classList.add("product");
    productContainer.innerHTML = `<img
                  src=${product.thumbnail}
                  alt="waffle"
                  width="150px"
                  class="dessert-image"
                  height="150px"
                />

                 <button onclick="removeFromCart(${index})">
                  <img
                    src="images/icon-remove-item.svg" 
                    alt=""
                    width="13px"
                  />Remove
                </button>

                <div class="description">
                  <p class="snack">${product.category}</p>
                  <p class="dessert-name">${product.title}</p>
                  <p class="amount">$${product.price}</p>
                </div>`; //dynamically creating the HTML content

    productList.appendChild(productContainer); //appends each productContainer to productList
  });
  displayCarts();
}

const cartList = document.getElementById("cartList");

function displayCarts() {
  cart.totalPrice = 0;
  cart.totalQuantity = 0; // resets the total price and quantity
  compiledProducts().forEach((product, index) => {
    const cartProduct = document.createElement("div");

    cartProduct.classList.add("cartProduct");
    cartProduct.innerHTML = `
    <div class="item">
    <p class="item-name">${product.title}</p>
    <p><span class="repeat">${product.cartCount}x</span> @ $${product.price} $${product.cartPrice}</p></div> `;

    cartList.appendChild(cartProduct); //adds each product to the cart list.
    cart.totalPrice += product.cartPrice;
    cart.totalQuantity += 1;
  });

  const totalPrice = document.getElementById("dollar");
  totalPrice.innerText = "$" + Number(cart.totalPrice).toFixed(2);

  const cartQuantity = document.getElementById("cartQuantity");

  cartQuantity.innerText = "(" + cart.totalQuantity + ")";
} //updates the total price and total quantity



function addToCart(id) {
  const productToAdd = products.find((product) => product.id == id); //finds the product with the given id in the product list
  const existingProductIndex = cart.products.findIndex(
    (product) => product.id == productToAdd.id);// chech if the product already exists in the cart
  
  

  if (existingProductIndex != -1) {
    cart.products[existingProductIndex].quantity += 1; // if the product already exiats in the cart, increase the quantity
  } else {
    cart.products.push({ ...productToAdd, quantity: 1 });
  }

  cartList.innerHTML = "";

  displayProducts(); // to refresh the browser
}
function removeFromCart(index) {
  const product = cart.products[index];

  cart.totalPrice -= product.price;// update the prices
  cart.totalQuantity -= 1;
  cart.products.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  cartList.innerHTML = ""; //to stop it from remebering the former products
  displayProducts();
}

const confirmButton = document.getElementById("Confirm");
const modal = document.querySelector(".modal");
const closeModalButton = document.getElementById("closeModal");

closeModalButton.addEventListener("click", function () {
  modal.classList.add("hide");// hide the modal when the button is clicked
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
  productList.innerHTML = "";//selects modal content and clears old products
  for (const product of compiledProducts()) {
    const modalProduct = document.createElement("div");
    modalProduct.classList.add("modalProductContainer");
    modalProduct.innerHTML = `<div class="modalProductContent">
  <img src="${product.thumbnail}" alt="" />
  <div>
    <p>${product.title}</p>
    <p>${product.cartCount} @$${product.price}</p>
  </div>
</div>
<div>$${product.cartPrice}</div>
`;// loops through the cart products, also includes their details like image, name, price etc

    productList.appendChild(modalProduct);
    // cartList.innerHTML = "";
    // displayCarts();
  }
  productList.innerHTML += `<div class="modalTotalPrice"><p>Order Total</p> <p>$${Number(cart.totalPrice).toFixed(3)}</p></div>`;
} //adds total order price at the bottom

// const newOrder = document.getElementById("newOrder");
// newOrder.addEventListener("click", function () {
//   alert("Payment Succesful!")
// })




const newOrder = document.getElementById("newOrder");
const successModal = document.getElementById("successModal");
const okButton = document.getElementById("okButton");
const paymentModal = document.querySelector(".paymentModal");
console.log(newOrder)
newOrder.addEventListener("click", function () {
  paymentModal.classList.remove("hide");
  cart = emptyCart;
  localStorage.setItem('cart', JSON.stringify(emptyCart));
  cartList.innerHTML = "";
  modal.classList.add("hide");
  displayProducts();
});
okButton.addEventListener("click", function () {
  paymentModal.classList.add("hide");
});


function compiledProducts() {
  const compileProducts = [];

  cart.products.forEach((product, index) => {
    const compileProduct = compileProducts.find((p) => p.id === product.id);
    if (compileProduct) {
      compileProduct.cartCount += 1;
      compileProduct.cartPrice =
        compileProduct.price * compileProduct.cartCount;
    } else {
      product.cartCount = 1;
      product.cartPrice = product.price;
      compileProducts.push(product);
    }
  });
  return compileProducts;
}
displayProducts();//groups all the products together and keeps track of the price and quantity
// displayCarts();

