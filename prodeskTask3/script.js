const passwordField = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
const generateBtn = document.getElementById("generate");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const length = document.getElementById("length");
const themeToggle = document.getElementById("theme-toggle");

function generatePassword() {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const num = "0123456789";
  const sym = "!@#$%^&*()_+-=[]{}|;:',.<>?/";

  let allChars = "";
  if (uppercase.checked) allChars += upper;
  if (lowercase.checked) allChars += lower;
  if (numbers.checked) allChars += num;
  if (symbols.checked) allChars += sym;

  if (allChars === "") {
    passwordField.value = "Please select options!";
    return;
  }

  let password = "";
  for (let i = 0; i < length.value; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  passwordField.value = password;
}

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", () => {
  passwordField.select();
  document.execCommand("copy");
  alert("Password copied to clipboard!");
});

// Theme toggle
function setTheme(mode) {
  if (mode === "light") {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "🌞";
  } else {
    document.body.classList.remove("light-mode");
    themeToggle.textContent = "🌙";
  }
  localStorage.setItem("theme", mode);
}

themeToggle.addEventListener("click", () => {
  const current = document.body.classList.contains("light-mode") ? "light" : "dark";
  setTheme(current === "dark" ? "light" : "dark");
});

// Init theme on load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  setTheme(savedTheme);
});
