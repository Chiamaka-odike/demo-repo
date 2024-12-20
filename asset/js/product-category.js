document.addEventListener("DOMContentLoaded", async function () {
  const categoiesList = document.getElementById('categoiesList');
  const response = await fetch("https://dummyjson.com/products/categories");
  const data = await response.json();
  console.log(data)
  data.forEach(category => {
    categoiesList.innerHTML+=`
     <a class="categoryItem" href="category.html?slug=${category.slug}">
       
        <p>${category.name}</p>
      </a>`
  });
});
