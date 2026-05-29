/* UI & navigation logic */

// Navigate to home 
function goHome() {
  window.location.href = "index.html";
}

// Dropdown menu logic
const dropdowns = document.querySelectorAll(".nav-dropdown");

dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("click", function (e) {
    if (e.target.closest(".dropdown-menu")) return;
    this.classList.toggle("open");
    e.preventDefault();
  });
});

document.addEventListener("click", function (e) {
  dropdowns.forEach((dropdown) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
    }
  });
});

function closeDropdown() {
  dropdowns.forEach((dropdown) => dropdown.classList.remove("open"));
}
