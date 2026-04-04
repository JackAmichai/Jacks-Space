class TranslationManager {
  constructor(defaultLang = 'en') {
    this.currentLang = defaultLang;
    this.translations = window.translations || {};
  }
  
  init() {
    console.log('TranslationManager: Initializing...');
    
    // 1. Load translations from window if available
    if (Object.keys(this.translations).length === 0 && window.translations) {
      this.translations = window.translations;
    }

    // 2. Determine initial language - FORCE 'en' as default if no preference
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && this.translations[savedLang]) {
      this.currentLang = savedLang;
    } else {
      this.currentLang = 'en';
      localStorage.setItem('preferred-language', 'en');
    }
    
    console.log('TranslationManager: Current language is', this.currentLang);
    
    // 3. Apply the language
    this.applyLanguage(this.currentLang);
    
    // 4. Setup the toggle button
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
    console.log('TranslationManager: Setting language to', lang);
    if (this.translations[lang]) {
      this.currentLang = lang;
      localStorage.setItem('preferred-language', lang);
      this.applyLanguage(lang);
      this.updateToggleButton();
    }
  }

  updateToggleButton() {
    const textEls = document.querySelectorAll('.lang-toggle-text');
    textEls.forEach(el => {
        // If current is EN, button should show HE (to switch to it)
        // If current is HE, button should show EN (to switch to it)
        el.innerHTML = this.currentLang === 'en' ? 'עב 🇮🇱' : 'EN 🇬🇧';
    });
  }
  
  applyLanguage(lang) {
    const t = this.translations[lang];
    if (!t) {
        console.error('TranslationManager: No translations found for', lang);
        return;
    }
    
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
        el.innerHTML = t[key];
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
    
    // Dispatch event for custom handling (e.g. updating dynamically rendered projects)
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }
  
  createLanguageToggle() {
    const toggle = document.getElementById('langToggle');
    if (toggle) {
      console.log('TranslationManager: Found langToggle button, attaching listener...');
      
      // Use a named function to avoid duplicate listeners if init is called multiple times
      const handleToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const newLang = this.currentLang === 'en' ? 'he' : 'en';
        this.setLanguage(newLang);
      };
      
      // Clear and re-attach
      toggle.removeEventListener('click', toggle._handler);
      toggle.addEventListener('click', handleToggle);
      toggle._handler = handleToggle;
      
      this.updateToggleButton();
    } else {
      console.warn('TranslationManager: langToggle button not found in DOM.');
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.translationManager = new TranslationManager();
        window.translationManager.init();
    });
} else {
    window.translationManager = new TranslationManager();
    window.translationManager.init();
}
