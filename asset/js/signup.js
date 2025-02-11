const button = document.querySelector(".submitBtn");
const Username = document.querySelector(".Username");
const email = document.querySelector(".email");
const Password = document.querySelector(".Password");
const ConfirmPassword = document.querySelector(".ConfirmPassword");
const errorMessage = document.getElementById("errorMessage");
const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); //prevent submission
  let errors = [];

  errors = signUpErrors(Username, email, Password, ConfirmPassword);

  if (errors.length > 0) {
    errorMessage.innerText = errors.join(". ");
    return;
  }
  window.location.href = "http://127.0.0.1:5502/index.html";
});

// username more than 8
// email must be a valid adress
// password must be more than 8

function signUpErrors(Username, email, Password, ConfirmPassword) {
 const errors = [];

  if (Username.value.trim() === "") {
    errors.push("Username is required");
    Username.parentElement.classList.add("incorrect");
  }
  if (Username.value.trim().length <= 8) {
    errors.push("username must be more than 8 characters");
    Username.parentElement.classList.add("incorrect");
  }
  if (email.value.trim() === "") {
    errors.push("email is required");
    email.parentElement.classList.add("incorrect");
  }

  if (Password.value.trim() === "") {
    errors.push("Password is required");
    Password.parentElement.classList.add("incorrect");
  }
  if (Password.value.trim().length <= 8) {
    errors.push("Password must be more than 8 characters");
    Password.parentElement.classList.add("incorrect");
  }
  if (ConfirmPassword.value.trim() !== Password.value.trim()) {
    errors.push("Password doesn't match!");
    ConfirmPassword.parentElement.classList.add("incorrect");
  }

  return errors;
}

// const submitBtn = document.querySelector(".submitBtn");
// submitBtn.addEventListener("click", (e) => {
//   e.preventDefault();

//   const username = document.querySelector(".Username").value;
//   const email = document.querySelector(".email");
//   const password = document.querySelector(".Password");
//   const confirmPassword = document.querySelector(".ConfirmPassword");

//   let errorMessage = "";
//   const minUsernameLength = 10;
//   if (username.length < minUsernameLength) {
//     errorMessage = `The username cannot be shorter than ${minUsernameLength} characters.`
//   }
// });
