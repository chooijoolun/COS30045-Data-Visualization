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

    const shouldOpen = !this.classList.contains("open");
    dropdowns.forEach((item) => item.classList.remove("open"));

    if (shouldOpen) {
      this.classList.add("open");
    }

    e.preventDefault();
  });
});

document.addEventListener("click", function (e) {
  if (!e.target.closest(".nav-dropdown")) {
    dropdowns.forEach((dropdown) => dropdown.classList.remove("open"));
  }
});

function closeDropdown() {
  dropdowns.forEach((dropdown) => dropdown.classList.remove("open"));
}
