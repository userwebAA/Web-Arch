document.addEventListener('DOMContentLoaded', () => {
    // Language dropdown
    const languageToggle = document.querySelector('.language-toggle');
    const languageSelector = document.querySelector('.language-selector');
    const languageOptions = document.querySelector('.language-options');
    let isLanguageMenuOpen = false;

    // Toggle language menu on click
    languageToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        isLanguageMenuOpen = !isLanguageMenuOpen;
        languageOptions.style.display = isLanguageMenuOpen ? 'block' : 'none';
        languageSelector.classList.toggle('active', isLanguageMenuOpen);
    });

    // Close language menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.language-selector')) {
            isLanguageMenuOpen = false;
            languageOptions.style.display = 'none';
            languageSelector.classList.remove('active');
        }
    });

    const themeToggle = document.getElementById('theme-toggle');
    const moonIcon = document.querySelector('.moon-icon');
    const sunIcon = document.querySelector('.sun-icon');
    
    // Check system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme') || 
                      (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Apply initial theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateIcons(savedTheme === 'dark');
    
    // Toggle theme
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcons(newTheme === 'dark');
    });
    
    // Update icons visibility
    function updateIcons(isDark) {
        moonIcon.style.display = isDark ? 'none' : 'block';
        sunIcon.style.display = isDark ? 'block' : 'none';
    }
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateIcons(newTheme === 'dark');
        }
    });
});
