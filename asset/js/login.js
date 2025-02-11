

const button = document.querySelector(".submitBtn");
const usernameInputs = document.querySelector(".usernameInput");
const inputs = document.querySelector(".passwordInput");
const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let errors = [];

  errors = loginErrors(usernameInputs, inputs);

  if (errors.length > 0) {
    errorMessage.innerText = errors.join(". ");
    return;
  }
  inputs.value = ""
  usernameInputs.value = ""
  window.location.href = "http://127.0.0.1:5502/index.html";
});

function loginErrors(usernameInputs, inputs) {
  const errors = [];

  if (usernameInputs.value.trim() === "") {
    errors.push("username is required");
    usernameInputs.parentElement.classList.add("incorrect");
  }
  if (usernameInputs.value.trim().length <= 8) {
    errors.push("username must be more than 8 characters");
    usernameInputs.parentElement.classList.add("incorrect");
  }
  if (inputs.value.trim() === "") {
    errors.push("password is required");
    inputs.parentElement.classList.add("incorrect");
  }
  if (inputs.value.trim().length <= 8) {
    errors.push("password must be more than 8 characters");
    inputs.parentElement.classList.add("incorrect");
  }

  return errors;
}
