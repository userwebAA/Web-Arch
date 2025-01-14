// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get all language buttons
    const languageButtons = document.querySelectorAll('.language-option');
    const currentLangDisplay = document.querySelector('.current-lang');

    // Set initial language from localStorage or default to French
    const currentLang = localStorage.getItem('selectedLanguage') || 'fr';
    updateLanguage(currentLang);

    // Add click event listeners to language buttons
    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            console.log('Language selected:', selectedLang); // Debug log
            
            // Save selected language
            localStorage.setItem('selectedLanguage', selectedLang);
            
            // Update display
            if (currentLangDisplay) {
                currentLangDisplay.textContent = getLanguageName(selectedLang);
            }

            // Update URL and reload page
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('lang', selectedLang);
            window.location.href = newUrl.toString();
        });
    });

    // Function to get language display name
    function getLanguageName(lang) {
        const names = {
            'fr': 'Français',
            'en': 'English',
            'zh': '中文'
        };
        return names[lang] || 'Français';
    }

    // Function to update language
    function updateLanguage(lang) {
        // Update HTML lang attribute
        document.documentElement.setAttribute('lang', lang);

        // Update language display
        if (currentLangDisplay) {
            currentLangDisplay.textContent = getLanguageName(lang);
        }

        // Update all translatable elements
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            let translation;

            // Try to get translation from contactTranslations first
            if (contactTranslations && contactTranslations[lang]) {
                const keys = key.split('.');
                let value = contactTranslations[lang];
                for (const k of keys) {
                    if (value && value[k]) {
                        value = value[k];
                    } else {
                        value = null;
                        break;
                    }
                }
                if (value) {
                    translation = value;
                }
            }

            // If not found in contactTranslations, try translations
            if (!translation) {
                translation = getTranslation(key, lang);
            }
            
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = translation;
                } else if (element.hasAttribute('placeholder')) {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { lang }
        }));
    }

    // Function to get translation
    function getTranslation(key, lang) {
        try {
            const keys = key.split('.');
            let value = translations[lang];
            
            for (const k of keys) {
                if (value && value[k]) {
                    value = value[k];
                } else {
                    console.warn(`Translation missing for key: ${key} in language: ${lang}`);
                    return null;
                }
            }
            
            return value;
        } catch (error) {
            console.error('Error getting translation:', error);
            return null;
        }
    }

    // Check URL parameters for language
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    
    if (urlLang && ['fr', 'en', 'zh'].includes(urlLang)) {
        updateLanguage(urlLang);
        localStorage.setItem('selectedLanguage', urlLang);
    }
});
