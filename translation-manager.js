class TranslationManager {
  constructor(defaultLang = 'en') {
    this.currentLang = defaultLang;
    this.translations = window.translations;
    this.init();
  }
  
  init() {
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
    return this.translations[this.currentLang]?.[key] || 
           this.translations['en']?.[key] || 
           key;
  }
  
  setLanguage(lang) {
    if (this.translations[lang]) {
      this.currentLang = lang;
      localStorage.setItem('preferred-language', lang);
      this.applyLanguage(lang);
      
      // Update toggle buttons text
      document.querySelectorAll('.lang-toggle-text').forEach(el => {
        el.textContent = lang === 'en' ? 'עב' : 'EN';
      });
    }
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
        // Preserve any inner HTML like icons if present, but usually data-i18n is for text
        if (el.children.length === 0) {
            el.textContent = t[key];
        } else {
            // If there are children (like icons), we might need to be more careful.
            // For now, let's assume we use data-i18n on elements that only contain text
            // or we handle them specifically.
            const textNode = Array.from(el.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
            if (textNode) {
                textNode.textContent = t[key];
            } else {
                // Fallback for elements like buttons that might have a span inside
                const span = el.querySelector('span:not([data-i18n])');
                if (span) {
                    span.textContent = t[key];
                }
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
    
    // Dispatch event for custom handling (e.g. updating dynamically rendered projects)
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }
  
  createLanguageToggle() {
    // Instead of creating a new one, we'll look for placeholders in the HTML
    // or add it to the nav if it doesn't exist.
    const navRight = document.querySelector('.nav-right-new');
    if (navRight && !document.querySelector('.lang-toggle-new')) {
      const toggle = document.createElement('button');
      toggle.className = 'theme-toggle-new lang-toggle-new';
      toggle.id = 'langToggle';
      toggle.setAttribute('aria-label', 'Toggle language');
      toggle.innerHTML = `<span class="lang-toggle-text">${this.currentLang === 'en' ? 'עב' : 'EN'}</span>`;
      
      toggle.addEventListener('click', () => {
        const newLang = this.currentLang === 'en' ? 'he' : 'en';
        this.setLanguage(newLang);
      });
      
      // Insert before theme toggle
      const themeToggle = document.getElementById('themeToggle');
      if (themeToggle) {
        navRight.insertBefore(toggle, themeToggle);
      } else {
        navRight.appendChild(toggle);
      }
    }
  }
}

// Initialize when translations are loaded
document.addEventListener('DOMContentLoaded', () => {
    window.translationManager = new TranslationManager();
});
