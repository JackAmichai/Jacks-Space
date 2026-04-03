# Future TODO: English to Hebrew Translation Guide

## Overview
This document provides a comprehensive guide for implementing English to Hebrew (RTL) translation support for the Jack Amichai portfolio website.

---

## Important: Hebrew is RTL (Right-to-Left)

Hebrew, Arabic, and other RTL languages require:
- Text alignment to the right
- Mirrored layout (navigation on right, etc.)
- Reversed horizontal flow for UI elements
- `dir="rtl"` attribute on the HTML element

---

## Implementation Strategy

### Option 1: JavaScript-Based Translation (Recommended for Portfolios)

This approach uses a simple translation object and toggles between languages without page reload.

#### Step 1: Create Translation Data Structure

```javascript
// translations.js
const translations = {
  en: {
    // Navigation
    nav_home: "Home",
    nav_about: "About",
    nav_experience: "Experience",
    nav_skills: "Skills",
    nav_projects: "Projects",
    nav_contact: "Contact",
    
    // Hero Section
    hero_greeting: "Hi, I'm",
    hero_name: "Jack Amichai",
    hero_title: "AI & Integration Consultant",
    hero_subtitle: "Bridging Business Needs with Technical Excellence",
    hero_cta_resume: "View Resume",
    hero_cta_story: "My Story",
    hero_cta_role: "Is Jack Right for You?",
    
    // Section Titles
    section_about: "About Me",
    section_experience: "Experience",
    section_skills: "Skills & Expertise",
    section_projects: "Projects",
    section_certifications: "Certifications",
    section_recommendations: "Recommendations",
    section_contact: "Get in Touch",
    
    // Role Fit Modal
    role_fit_title: "Is Jack right for your team?",
    role_fit_subtitle: "Select a role to see how Jack's background maps to your needs.",
    role_fit_genai: "GenAI Engineer",
    role_fit_arch: "Solutions Architect",
    role_fit_pm: "Project Manager",
    role_fit_solutions: "Solutions Engineer",
    
    // Certifications
    cert_view_all: "View All Certifications",
    cert_poker_hint: "Hover to preview · Click to reveal",
    cert_resuffle: "Reshuffle",
    
    // Recommendations
    refs_download: "Download recommendation letter",
    refs_pick_card: "Pick a card — any card",
    refs_your_card: "Your card",
    
    // Contact
    contact_name: "Name",
    contact_email: "Email",
    contact_message: "Message",
    contact_send: "Send Message",
    
    // Footer
    footer_copyright: "© 2026 Jack Amichai. All rights reserved.",
  },
  
  he: {
    // Navigation
    nav_home: "דף הבית",
    nav_about: "אודות",
    nav_experience: "ניסיון",
    nav_skills: "מיומנויות",
    nav_projects: "פרויקטים",
    nav_contact: "צור קשר",
    
    // Hero Section
    hero_greeting: "שלום, אני",
    hero_name: "ג'ק אמיכאי",
    hero_title: "יועץ AI ואינטגרציות",
    hero_subtitle: "גישור בין צרכי העסק למצוינות טכנית",
    hero_cta_resume: "צפה בקורות חיים",
    hero_cta_story: "הסיפור שלי",
    hero_cta_role: "האם ג'ק מתאים לך?",
    
    // Section Titles
    section_about: "קצת עליי",
    section_experience: "ניסיון תעסוקתי",
    section_skills: "מיומנויות ומומחיות",
    section_projects: "פרויקטים",
    section_certifications: "הסמכות",
    section_recommendations: "המלצות",
    section_contact: "צור קשר",
    
    // Role Fit Modal
    role_fit_title: "האם ג'ק מתאים לצוות שלך?",
    role_fit_subtitle: "בחר תפקיד כדי לראות כיצד הרקע של ג'ק מתאים לצרכיך.",
    role_fit_genai: "מהנדס GenAI",
    role_fit_arch: "אדריכל פתרונות",
    role_fit_pm: "מנהל פרויקטים",
    role_fit_solutions: "מהנדס פתרונות",
    
    // Certifications
    cert_view_all: "צפה בכל ההסמכות",
    cert_poker_hint: "רחף לתצוגה מקדימה · לחץ לחשיפה",
    cert_resuffle: "ערבב מחדש",
    
    // Recommendations
    refs_download: "הורד מכתב המלצה",
    refs_pick_card: "בחר כרטיס — כל כרטיס",
    refs_your_card: "הכרטיס שלך",
    
    // Contact
    contact_name: "שם",
    contact_email: "אימייל",
    contact_message: "הודעה",
    contact_send: "שלח הודעה",
    
    // Footer
    footer_copyright: "© 2026 ג'ק אמיכאי. כל הזכויות שמורות.",
  }
};
```

#### Step 2: Create Translation Manager Class

```javascript
// translation-manager.js
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
    }
  }
  
  applyLanguage(lang) {
    const t = this.translations[lang];
    if (!t) return;
    
    // Update document direction for RTL languages
    document.documentElement.dir = (lang === 'he' || lang === 'ar') ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        el.textContent = t[key];
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
    const toggle = document.createElement('button');
    toggle.className = 'lang-toggle';
    toggle.innerHTML = this.currentLang === 'en' ? 'עב' : 'EN';
    toggle.setAttribute('aria-label', 'Toggle language');
    
    toggle.addEventListener('click', () => {
      const newLang = this.currentLang === 'en' ? 'he' : 'en';
      this.setLanguage(newLang);
      toggle.innerHTML = newLang === 'en' ? 'עב' : 'EN';
    });
    
    // Add to navigation
    const nav = document.querySelector('.main-nav');
    if (nav) {
      nav.appendChild(toggle);
    }
  }
}

// Initialize
window.translationManager = new TranslationManager();
```

#### Step 3: Add HTML Data Attributes

Add `data-i18n` attributes to all translatable elements:

```html
<!-- Before -->
<h1 class="hero-title">Hi, I'm Jack Amichai</h1>
<button class="cta-btn">View Resume</button>

<!-- After -->
<h1 class="hero-title" data-i18n="hero_greeting">Hi, I'm Jack Amichai</h1>
<button class="cta-btn" data-i18n="hero_cta_resume">View Resume</button>
```

#### Step 4: Add CSS for RTL Support

```css
/* Base RTL styles */
[dir="rtl"] {
  text-align: right;
}

/* Navigation - mirror for RTL */
[dir="rtl"] .main-nav {
  flex-direction: row-reverse;
}

[dir="rtl"] .nav-links {
  flex-direction: row-reverse;
}

/* Cards and sections */
[dir="rtl"] .card {
  text-align: right;
}

[dir="rtl"] .card-icon {
  order: 2; /* Move icon to right side */
}

/* Timeline - reverse direction */
[dir="rtl"] .timeline {
  direction: rtl;
}

[dir="rtl"] .timeline-item {
  padding-left: 0;
  padding-right: 30px;
  border-left: none;
  border-right: 3px solid var(--accent);
}

[dir="rtl"] .timeline-dot {
  left: auto;
  right: -9px;
}

/* Buttons and arrows */
[dir="rtl"] .btn-icon-arrow {
  transform: scaleX(-1);
}

[dir="rtl"] .carousel-prev {
  left: auto;
  right: 10px;
}

[dir="rtl"] .carousel-next {
  right: auto;
  left: 10px;
}

/* Form inputs */
[dir="rtl"] input,
[dir="rtl"] textarea {
  text-align: right;
}

/* Poker cards and interactive elements */
[dir="rtl"] .cert-poker-legend {
  left: auto;
  right: 18px;
}

[dir="rtl"] .cert-poker-chip {
  /* Adjust chip positions */
}

[dir="rtl"] .refs-card-arrow-left {
  left: auto;
  right: 14px;
}

[dir="rtl"] .refs-card-arrow-right {
  right: auto;
  left: 14px;
}

/* Modal adjustments */
[dir="rtl"] .modal-close {
  left: 20px;
  right: auto;
}

[dir="rtl"] .modal-content {
  text-align: right;
}
```

#### Step 5: Add JavaScript RTL Utilities

```javascript
// RTL utility functions
const RTLUtils = {
  // Check if current language is RTL
  isRTL() {
    return document.documentElement.dir === 'rtl';
  },
  
  // Mirror horizontal positions
  mirrorX(position) {
    return this.isRTL() ? `calc(100% - ${position})` : position;
  },
  
  // Update flexbox directions
  updateFlexDirection(element, isRTL) {
    element.style.flexDirection = isRTL ? 'row-reverse' : 'row';
  },
  
  // Mirror transforms
  mirrorTransform(element, originalTransform) {
    if (this.isRTL()) {
      return originalTransform.replace('translateX(', 'translateX(-')
                              .replace('translateX(-', 'translateX(');
    }
    return originalTransform;
  }
};
```

---

## Option 2: CSS Content Translation

For simpler cases, use CSS content property:

```css
/* HTML: <span class="i18n" data-en="Hello" data-he="שלום"></span> */

.i18n::before {
  content: attr(data-en);
}

[lang="he"] .i18n::before {
  content: attr(data-he);
}
```

---

## Option 3: External Libraries

### Recommended Libraries:
1. **i18next** - Full-featured internationalization
2. **react-i18next** - React bindings for i18next
3. **l10n.js** - Lightweight solution

### i18next Example:
```javascript
import i18next from 'i18next';

i18next.init({
  lng: 'en',
  resources: {
    en: { translation: { /* English strings */ } },
    he: { translation: { /* Hebrew strings */ } }
  }
});

// Use in code
document.getElementById('title').textContent = i18next.t('hero_title');
```

---

## Important Considerations

### 1. Font Support
Hebrew requires proper font support:

```css
[lang="he"],
[dir="rtl"] {
  font-family: 'Heebo', 'Rubik', 'Noto Sans Hebrew', sans-serif;
  font-feature-settings: "dlig" 1; /* Hebrew ligatures */
}

/* Font import */
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700&family=Rubik:wght@400;500;700&display=swap');
```

### 2. Long Text Handling
Hebrew text often takes more horizontal space:

```css
[dir="rtl"] .long-text {
  word-break: break-word;
  overflow-wrap: break-word;
}
```

### 3. Icons and Arrows
Many icons need mirroring:

```css
[dir="rtl"] .icon-arrow-right::before {
  content: "←"; /* Use left arrow in RTL */
}

[dir="rtl"] .icon-external-link::before {
  transform: scaleX(-1);
}
```

### 4. Date and Number Formatting
Hebrew uses different formats:

```javascript
// Dates
const hebrewDate = new Intl.DateTimeFormat('he-IL').format(date);

// Numbers (same as English, but RTL context)
const number = new Intl.NumberFormat('he-IL').format(1234567);
```

### 5. Form Validation Messages
Translate error messages:

```javascript
const validationMessages = {
  en: { required: "This field is required", email: "Invalid email format" },
  he: { required: "שדה זה נדרש", email: "פורמט אימייל לא תקין" }
};
```

---

## Implementation Checklist

- [ ] Create translations object with all strings
- [ ] Add `data-i18n` attributes to HTML elements
- [ ] Create TranslationManager class
- [ ] Add language toggle button to navigation
- [ ] Implement RTL CSS styles
- [ ] Test all interactive elements in RTL mode
- [ ] Verify fonts load correctly
- [ ] Test form validation messages
- [ ] Check date/number formatting
- [ ] Verify icon mirroring
- [ ] Test on mobile devices
- [ ] Add to `localStorage` for persistence
- [ ] Add keyboard shortcut (e.g., `Alt+L` for language toggle)

---

## Testing Checklist

1. **Visual Testing**
   - [ ] All text displays correctly
   - [ ] Layout mirrors properly
   - [ ] Icons and arrows are mirrored
   - [ ] Font renders correctly
   - [ ] No horizontal overflow issues

2. **Functional Testing**
   - [ ] Language toggle works
   - [ ] Preferences persist after reload
   - [ ] All buttons are clickable
   - [ ] Forms submit correctly
   - [ ] Modals open/close properly

3. **Browser Testing**
   - [ ] Chrome
   - [ ] Firefox
   - [ ] Safari
   - [ ] Edge

4. **Device Testing**
   - [ ] Desktop
   - [ ] Tablet
   - [ ] Mobile phone

---

## Common Issues and Solutions

### Issue: Text overflow on buttons
```css
[dir="rtl"] .btn {
  min-width: max-content;
  padding: 0.5em 1em;
}
```

### Issue: Images not flipping
```css
[dir="rtl"] .profile-image {
  transform: scaleX(-1); /* Only if truly needed */
}
```

### Issue: Custom scrollbars
```css
[dir="rtl"] ::-webkit-scrollbar {
  /* Scrollbar on left side for RTL */
}
```

### Issue: Third-party embeds
Check if embedded content supports RTL:
- Google Maps - supports RTL
- YouTube embeds - supports RTL
- Social media widgets - may need custom handling

---

## Resources

- [MDN: RTL Styling Guide](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/RTL_Web_Architecture)
- [CSS Tricks: RTL](https://css-tricks.com/almanac/properties/d/direction/)
- [W3C: RTL Best Practices](https://www.w3.org/International/articles/inline-bidi-markup/)

---

## Notes

- Hebrew translation should be done by a native speaker
- Consider using a professional translation service for marketing copy
- Technical terms may remain in English (GenAI, API, etc.)
- Test with actual Hebrew users for best UX feedback
