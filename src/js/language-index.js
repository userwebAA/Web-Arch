document.addEventListener('DOMContentLoaded', () => {
    const languageButtons = document.querySelectorAll('.language-option');
    const currentLangDisplay = document.querySelector('.current-lang');

    // Set initial language from localStorage or default to French
    const currentLang = localStorage.getItem('selectedLanguage') || 'fr';
    updateLanguage(currentLang);

    // Add click event listeners to language buttons
    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            console.log('Language selected:', selectedLang);
            
            // Save selected language
            localStorage.setItem('selectedLanguage', selectedLang);
            
            // Update display
            if (currentLangDisplay) {
                currentLangDisplay.textContent = getLanguageName(selectedLang);
            }

            // Update translations immediately
            updateLanguage(selectedLang);
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
            const translation = getTranslation(key, lang);
            
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
    }

    // Function to get translation
    function getTranslation(key, lang) {
        try {
            const keys = key.split('.');
            let value = indexTranslations[lang];
            
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
