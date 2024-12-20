document.addEventListener("DOMContentLoaded", async function () {
  const urlParam = new URLSearchParams(window.location.search);
  const categorySlug = urlParam.get("slug");

  const productList = document.getElementById("productList");
  const response = await fetch(
    `https://dummyjson.com/products/category/${categorySlug}`
  );
  const data = await response.json();
  console.log(data);
  data.products.forEach((product) => {
    productList.innerHTML += ` <div class="products">
      <div class="productCard">
           <div class="images"> <img src="${product.thumbnail}" alt=""></div>
           <div class="label">
            <div class="title">
            <p>${product.title}</p>
            </div>

           <div class="price"> 
           <p>${product.price}</p>
           </div>
           <div class="discount">
           <p>${product.discountPercentage}</p>
           </div>
           
           <button class="buyNow">BUY NOW</button>
           </div>
            </div>
        </div>
         
          
        `;
  });
});
