// Fonction pour mettre à jour les traductions
function setLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
    
    // Dispatch un événement personnalisé pour notifier du changement de langue
    const event = new CustomEvent('languageChanged', {
        detail: { lang: lang }
    });
    window.dispatchEvent(event);
}

// Fonction pour mettre à jour les traductions sur la page
function updatePageTranslations(translations, lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else if (element.tagName === 'OPTION') {
                element.text = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Mettre à jour la langue du document
    document.documentElement.lang = lang;
}
