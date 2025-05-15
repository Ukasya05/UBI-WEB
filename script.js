document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('nav ul.nav-links');
    const dropdown = document.querySelector('nav ul li.dropdown');
    const dropbtn = dropdown.querySelector('a.dropbtn');

    // Toggle navigation menu on hamburger click
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Toggle dropdown menu on dropbtn click (for mobile)
    dropbtn.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetID = href.substring(1);
                const targetSection = document.getElementById(targetID);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
                // Close menu on link click (mobile)
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                dropdown.classList.remove('active');
            }
            // else allow default navigation for external links
        });
    });
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
    // Check fade-in sections visibility on scroll
    fadeInOnScroll();
};

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Fade-in on scroll functionality
function fadeInOnScroll() {
    const fadeElements = document.querySelectorAll('.fade-in-section');
    const windowBottom = window.innerHeight + window.pageYOffset;

    fadeElements.forEach(el => {
        const elementTop = el.offsetTop;
        if (windowBottom > elementTop + 100) { // 100px offset for earlier fade-in
            el.classList.add('is-visible');
        }
    });
}

// Initial check in case elements are in view on page load
window.addEventListener('load', fadeInOnScroll);

// Contact form submission to WhatsApp
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const packageSelected = document.getElementById('package').value;
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !packageSelected || !message) {
            alert('Mohon lengkapi semua field sebelum mengirim.');
            return;
        }

        const whatsappMessage = 
            `Nama: ${name}%0A` +
            `Email: ${email}%0A` +
            `Paket yang dipilih: ${packageSelected}%0A` +
            `Pesan: ${message}`;

        // Replace with your WhatsApp number including country code, no + or 00
        const whatsappNumber = '+6287839307738';

        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

        window.open(whatsappURL, '_blank');
    });
}
