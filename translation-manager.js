class TranslationManager {
  constructor(defaultLang = 'en') {
    this.currentLang = defaultLang;
    this.translations = window.translations || {};
    this.init();
  }
  
  init() {
    // Re-check translations if they weren't loaded in constructor
    if (Object.keys(this.translations).length === 0 && window.translations) {
      this.translations = window.translations;
    }

    // Check for saved language preference
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && this.translations[savedLang]) {
      this.currentLang = savedLang;
    }
    
    // Apply initial language
    this.applyLanguage(this.currentLang);
    this.createLanguageToggle();
  }
  
  t(key) {
    if (!this.translations[this.currentLang]) {
        return this.translations['en']?.[key] || key;
    }
    return this.translations[this.currentLang][key] || 
           this.translations['en']?.[key] || 
           key;
  }
  
  setLanguage(lang) {
    if (this.translations[lang]) {
      this.currentLang = lang;
      localStorage.setItem('preferred-language', lang);
      this.applyLanguage(lang);
      
      // Update toggle buttons text/emoji
      this.updateToggleButton();
    }
  }

  updateToggleButton() {
    document.querySelectorAll('.lang-toggle-text').forEach(el => {
        el.innerHTML = this.currentLang === 'en' ? 'עב 🇮🇱' : 'EN 🇬🇧';
    });
  }
  
  applyLanguage(lang) {
    const t = this.translations[lang];
    if (!t) return;
    
    // Update document direction for RTL languages
    const isRTL = lang === 'he';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    if (isRTL) {
      document.documentElement.classList.add('rtl-mode');
    } else {
      document.documentElement.classList.remove('rtl-mode');
    }
    
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        // Handle elements with nested structure (like icons + text)
        const textNode = Array.from(el.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
        if (textNode) {
            textNode.textContent = t[key];
        } else if (el.children.length === 0) {
            el.textContent = t[key];
        } else {
            // Check if there's a span specifically for text
            const span = el.querySelector('span:not([data-i18n])') || el.querySelector('.btn-text');
            if (span) {
                span.textContent = t[key];
            } else {
                // If it's a menu link or similar, it might be just text inside
                el.innerHTML = el.innerHTML.replace(el.innerText.trim(), t[key]);
            }
        }
      }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key]) {
        el.placeholder = t[key];
      }
    });
    
    // Update aria-labels
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      if (t[key]) {
        el.setAttribute('aria-label', t[key]);
      }
    });
    
    // Dispatch event for custom handling
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }
  
  createLanguageToggle() {
    const toggle = document.getElementById('langToggle');
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const newLang = this.currentLang === 'en' ? 'he' : 'en';
        this.setLanguage(newLang);
      });
      
      // Update initial state
      this.updateToggleButton();
    }
  }
}

// Initialize when translations are loaded
document.addEventListener('DOMContentLoaded', () => {
    window.translationManager = new TranslationManager();
});
