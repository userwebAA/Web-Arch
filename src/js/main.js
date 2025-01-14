// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Language selector dropdown functionality
document.addEventListener('DOMContentLoaded', () => {
    const languageSelector = document.querySelector('.language-selector');
    const languageToggle = document.querySelector('.language-toggle');

    // Toggle dropdown on button click
    if (languageToggle) {
        languageToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            languageSelector.classList.toggle('active');
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (languageSelector && !languageSelector.contains(e.target)) {
            languageSelector.classList.remove('active');
        }
    });

    // Prevent dropdown from closing when clicking inside
    languageSelector.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});
