document.addEventListener("DOMContentLoaded", async function () {});

document.addEventListener("DOMContentLoaded", async function () {
  const link = document.getElementById("link");
  const dropDown = document.querySelector(".dropDown");
  const toggleDropDown = document.querySelector(".toogle-dropdown");
  const info = document.getElementsByClassName("info");
  const categoiesList = document.getElementById("categoiesList");
  const response = await fetch("https://dummyjson.com/products/categories");
  const data = await response.json();
  data.forEach((category) => {
    dropDown.innerHTML += `
        <div class ="itemBox">
          <a class="categoryItem" href="category.html?slug=${category.slug}">
            <p class="itemSlug">${category.name}</p>
          </a>
        </div>
    `;
  });

  link.addEventListener("click", function () {
    toggleDropDown.classList.toggle("hide");
    dropDown.classList.toggle("hide");
  });

  const sideBar = document.querySelector(".sideBar");
  // sideBar.addEventListener("click", function () {
  //   console.log("clicked");
  // });


  data.forEach((category) => {
    categoiesList.innerHTML += `
      <a class="categoryItem" href="category.html?slug=${category.slug}">
        <p>${category.name}</p>
      </a>
    `;
  });
});
