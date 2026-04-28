// Function to handle logo click - returns to home page
function goHome() {
    window.location.href = "index.html";
};

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavLink();
    animateCardsOnScroll();
    addRippleEffect();
    console.log('Home page loaded | Energy Appliances');
});