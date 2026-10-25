/* ================= SETTINGS ================= */

// Paste your Web3Forms Access Key between the quotes.
// Until you do, the form will open WhatsApp with the customer's details instead.
const WEB3FORMS_KEY = "8bbd741a-32f1-42d0-b0f7-e741495ae2ed;

const WHATSAPP_NUMBER = "971524413992";


document.addEventListener("DOMContentLoaded", function () {

    /* ================= MOBILE MENU ================= */

    const menuBtn = document.querySelector(".mobile-menu-btn");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links a");

    if (menuBtn && nav) {

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
    }


    /* ================= QUOTE FORM ================= */

    const forms = document.querySelectorAll("form.quote-form");

    forms.forEach(function (form) {

        const button = form.querySelector("button[type='submit']");
        const originalButtonText = button ? button.innerHTML : "";

        // Message box shown under the form
        const note = document.createElement("p");
        note.setAttribute("role", "status");
        note.style.cssText = "margin-top:14px;font-size:15px;line-height:1.6;display:none;";
        form.appendChild(note);

        function showNote(text, ok) {
            note.textContent = text;
            note.style.display = "block";
            note.style.color = ok ? "#1a7f37" : "#b3261e";
        }

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const data = new FormData(form);
            const name = (data.get("name") || "").toString().trim();
            const phone = (data.get("phone") || "").toString().trim();
            const place = (data.get("location") || "").toString().trim();
            const service = (data.get("service") || "").toString().trim();
            const message = (data.get("message") || "").toString().trim();

            // ---- No key yet: send the details to WhatsApp ----
            if (WEB3FORMS_KEY === "PASTE_YOUR_ACCESS_KEY_HERE") {
                const text =
                    "Hi, I would like a free quote.\n" +
                    "Name: " + name + "\n" +
                    "Phone: " + phone + "\n" +
                    "Location: " + place + "\n" +
                    "Service: " + service + "\n" +
                    "Details: " + message;

                window.open(
                    "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text),
                    "_blank"
                );
                return;
            }

            // ---- Send to email through Web3Forms ----
            if (button) {
                button.disabled = true;
                button.innerHTML = "Sending...";
            }
            note.style.display = "none";

            const payload = {
                access_key: WEB3FORMS_KEY,
                subject: "New quote request: " + (service || "Waste removal") + " (Dubai)",
                from_name: "D2D Waste Removal Website",
                name: name,
                phone: phone,
                location: place,
                service: service,
                message: message,
                page: window.location.href
            };

            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            })
                .then(function (response) { return response.json(); })
                .then(function (result) {
                    if (result.success) {
                        form.reset();
                        showNote("Thank you! We received your request and will contact you shortly.", true);
                    } else {
                        showNote("Sorry, something went wrong. Please call 052 441 3992 or message us on WhatsApp.", false);
                    }
                })
                .catch(function () {
                    showNote("Sorry, something went wrong. Please call 052 441 3992 or message us on WhatsApp.", false);
                })
                .finally(function () {
                    if (button) {
                        button.disabled = false;
                        button.innerHTML = originalButtonText;
                    }
                });
        });
    });

});