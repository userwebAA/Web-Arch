const contactTranslations = {
    fr: {
        site: {
            name: "STUDIO ARCHITECTURE"
        },
        nav: {
            work: "Projets",
            about: "À Propos",
            contact: "Contact",
            languageSelector: "Sélectionner la langue"
        },
        contact: {
            title: "Contact - Studio Architecture",
            heading: "Demande de Devis",
            description: "Contactez-nous pour discuter de votre projet. Nous vous répondrons dans les plus brefs délais.",
            form: {
                name: "Nom",
                email: "Email",
                projectType: "Type de Projet",
                selectOption: "Sélectionnez une option",
                residential: "Résidentiel",
                commercial: "Commercial",
                renovation: "Rénovation",
                other: "Autre",
                budget: "Budget Estimé (€)",
                timeline: "Délai Souhaité",
                location: "Localisation du Projet",
                message: "Description du Projet",
                submit: "Envoyer la Demande",
                success: "Votre message a été envoyé avec succès. Nous vous contacterons bientôt.",
                error: "Une erreur s'est produite. Veuillez réessayer."
            }
        }
    },
    en: {
        site: {
            name: "STUDIO ARCHITECTURE"
        },
        nav: {
            work: "Projects",
            about: "About",
            contact: "Contact",
            languageSelector: "Select language"
        },
        contact: {
            title: "Contact - Studio Architecture",
            heading: "Request a Quote",
            description: "Contact us to discuss your project. We will respond as soon as possible.",
            form: {
                name: "Name",
                email: "Email",
                projectType: "Project Type",
                selectOption: "Select an option",
                residential: "Residential",
                commercial: "Commercial",
                renovation: "Renovation",
                other: "Other",
                budget: "Estimated Budget (€)",
                timeline: "Desired Timeline",
                location: "Project Location",
                message: "Project Description",
                submit: "Send Request",
                success: "Your message has been sent successfully. We will contact you soon.",
                error: "An error occurred. Please try again."
            }
        }
    },
    zh: {
        site: {
            name: "建筑工作室"
        },
        nav: {
            work: "项目",
            about: "关于",
            contact: "联系",
            languageSelector: "选择语言"
        },
        contact: {
            title: "联系我们 - 建筑工作室",
            heading: "申请报价",
            description: "联系我们讨论您的项目。我们会尽快回复您。",
            form: {
                name: "姓名",
                email: "电子邮件",
                projectType: "项目类型",
                selectOption: "选择选项",
                residential: "住宅",
                commercial: "商业",
                renovation: "装修",
                other: "其他",
                budget: "预算估计 (€)",
                timeline: "期望时间",
                location: "项目位置",
                message: "项目描述",
                submit: "发送请求",
                success: "您的消息已成功发送。我们会尽快与您联系。",
                error: "发生错误。请重试。"
            }
        }
    }
};

// Function to get translation for contact page
function getContactTranslation(key, lang) {
    const keys = key.split('.');
    let translation = contactTranslations[lang];
    
    for (const k of keys) {
        if (translation && translation[k]) {
            translation = translation[k];
        } else {
            return key; // Return the key if translation not found
        }
    }
    
    return translation;
}

// Function to update contact page translations
function updateContactTranslations(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (key.startsWith('contact.')) {
            const translation = getContactTranslation(key, lang);
            
            // Handle different types of elements
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translation;
            } else if (element.tagName === 'OPTION') {
                element.text = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
}
