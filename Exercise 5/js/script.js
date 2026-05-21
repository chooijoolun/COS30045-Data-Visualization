/* UI & navigation logic */

// Navigate to home 
function goHome() {
  window.location.href = "index.html";
}

// Dropdown menu logic 
const dropdown = document.getElementById("storyDropdown");

dropdown.addEventListener("click", function (e) {
  if (e.target.closest(".dropdown-menu")) return;
  this.classList.toggle("open");
  e.preventDefault();
});

document.addEventListener("click", function (e) {
  if (!dropdown.contains(e.target)) dropdown.classList.remove("open");
});

function closeDropdown() {
  dropdown.classList.remove("open");
}