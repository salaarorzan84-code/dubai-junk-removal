document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.querySelector(".mobile-menu-btn");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links a");

    // Open / Close mobile menu
    menuBtn.addEventListener("click", function () {
        nav.classList.toggle("mobile-open");

        // Change hamburger icon
        if (nav.classList.contains("mobile-open")) {
            menuBtn.innerHTML = "✕";
            menuBtn.setAttribute("aria-label", "Close Menu");
        } else {
            menuBtn.innerHTML = "☰";
            menuBtn.setAttribute("aria-label", "Open Menu");
        }
    });

    // Close menu when a link is clicked
    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            nav.classList.remove("mobile-open");

            menuBtn.innerHTML = "☰";
            menuBtn.setAttribute("aria-label", "Open Menu");
        });
    });

});