let apiProducts;
document.addEventListener("DOMContentLoaded", async function () {
  const urlParam = new URLSearchParams(window.location.search);
  const categorySlug = urlParam.get("slug");

  const productList = document.getElementById("productList");
  const response = await fetch(
    `https://dummyjson.com/products/category/${categorySlug}`
  );
  const data = await response.json();
  apiProducts = data.products;
  data.products.forEach((product) => {
    productList.innerHTML += ` <section class="page">
    <div class="products">
      <div class="productCard">
           <div class="images"> <img src="${product.thumbnail}" alt=""></div>
           <div class="label">
            <div class="title">
            <p>${product.title}</p>
            </div>

           <div class="price"> 
           <p>$${product.price}</p>
           </div>

           <div class="buttons">
           
           <button class="cart" onclick="Addtocart('${product.id}')">Add to Cart</button>
</div>
           </div>
            </div>
        </div>
        </section>
         
          
        `;
  });
});
const cart = JSON.parse(localStorage.getItem("cart")) || {
  totalPrice: 0.0,
  totalQuantity: 0,
  products: [],
};
const cartNo = document.getElementById("cartNo")
cartNo.innerText = cart.products.length

function Addtocart(productId) {
  const product = apiProducts.find((product) => product.id == productId);
    
  
  cart.totalPrice += product.price;
  cart.totalQuantity += 1;
  cart.products.push(product);
 
  cartNo.innerText = cart.products.length
  
  localStorage.setItem("cart", JSON.stringify(cart));
}
