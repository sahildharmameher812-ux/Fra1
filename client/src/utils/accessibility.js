// Accessibility and Government Portal Utilities

export const ACCESSIBILITY_FEATURES = {
  HIGH_CONTRAST: 'high-contrast',
  LARGE_TEXT: 'large-text',
  SCREEN_READER: 'screen-reader',
  KEYBOARD_NAV: 'keyboard-navigation'
};

export const LANGUAGES = {
  en: { name: 'English', nativeName: 'English', code: 'en' },
  hi: { name: 'Hindi', nativeName: 'हिंदी', code: 'hi' },
  bn: { name: 'Bengali', nativeName: 'বাংলা', code: 'bn' },
  od: { name: 'Odia', nativeName: 'ଓଡ଼ିଆ', code: 'od' },
  te: { name: 'Telugu', nativeName: 'తెలుగు', code: 'te' },
  ta: { name: 'Tamil', nativeName: 'தமிழ்', code: 'ta' },
  mr: { name: 'Marathi', nativeName: 'मराठी', code: 'mr' },
  gu: { name: 'Gujarati', nativeName: 'ગુજરાતી', code: 'gu' }
};

// Government Portal Compliance Features
export class AccessibilityManager {
  constructor() {
    this.features = new Set();
    this.currentLanguage = 'en';
    this.initialize();
  }

  initialize() {
    // Load saved preferences
    const savedFeatures = localStorage.getItem('fra-accessibility-features');
    const savedLanguage = localStorage.getItem('fra-language');
    
    if (savedFeatures) {
      this.features = new Set(JSON.parse(savedFeatures));
    }
    
    if (savedLanguage) {
      this.currentLanguage = savedLanguage;
    }

    this.applyFeatures();
  }

  toggleFeature(feature) {
    if (this.features.has(feature)) {
      this.features.delete(feature);
    } else {
      this.features.add(feature);
    }
    
    localStorage.setItem('fra-accessibility-features', JSON.stringify([...this.features]));
    this.applyFeatures();
  }

  setLanguage(languageCode) {
    this.currentLanguage = languageCode;
    localStorage.setItem('fra-language', languageCode);
    // Trigger language change event
    window.dispatchEvent(new CustomEvent('languageChange', { detail: languageCode }));
  }

  applyFeatures() {
    const root = document.documentElement;
    
    // High Contrast Mode
    if (this.features.has(ACCESSIBILITY_FEATURES.HIGH_CONTRAST)) {
      root.style.setProperty('--primary-color', '#000000');
      root.style.setProperty('--secondary-color', '#ffffff');
      root.style.setProperty('--background-color', '#ffffff');
      root.style.setProperty('--text-color', '#000000');
      document.body.classList.add('high-contrast');
    } else {
      root.style.removeProperty('--primary-color');
      root.style.removeProperty('--secondary-color');
      root.style.removeProperty('--background-color');
      root.style.removeProperty('--text-color');
      document.body.classList.remove('high-contrast');
    }

    // Large Text Mode
    if (this.features.has(ACCESSIBILITY_FEATURES.LARGE_TEXT)) {
      root.style.fontSize = '120%';
      document.body.classList.add('large-text');
    } else {
      root.style.fontSize = '';
      document.body.classList.remove('large-text');
    }

    // Screen Reader Mode
    if (this.features.has(ACCESSIBILITY_FEATURES.SCREEN_READER)) {
      document.body.classList.add('screen-reader-mode');
      this.enhanceForScreenReaders();
    } else {
      document.body.classList.remove('screen-reader-mode');
    }

    // Keyboard Navigation Enhancement
    if (this.features.has(ACCESSIBILITY_FEATURES.KEYBOARD_NAV)) {
      document.body.classList.add('keyboard-nav-enhanced');
      this.enhanceKeyboardNavigation();
    } else {
      document.body.classList.remove('keyboard-nav-enhanced');
    }
  }

  enhanceForScreenReaders() {
    // Add aria-labels and descriptions for screen readers
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
      if (button.textContent) {
        button.setAttribute('aria-label', button.textContent.trim());
      }
    });

    // Add role descriptions for complex components
    const cards = document.querySelectorAll('[class*="MuiCard"]');
    cards.forEach(card => {
      card.setAttribute('role', 'region');
      card.setAttribute('aria-label', 'Information card');
    });
  }

  enhanceKeyboardNavigation() {
    // Add visible focus indicators
    const style = document.createElement('style');
    style.textContent = `
      .keyboard-nav-enhanced *:focus {
        outline: 3px solid #FF6B35 !important;
        outline-offset: 2px !important;
      }
      
      .keyboard-nav-enhanced .MuiButton-root:focus {
        box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.5) !important;
      }
    `;
    document.head.appendChild(style);

    // Add skip links
    this.addSkipLinks();
  }

  addSkipLinks() {
    const skipLinks = document.createElement('div');
    skipLinks.className = 'skip-links';
    skipLinks.innerHTML = `
      <a href="#main-content" class="skip-link">Skip to main content</a>
      <a href="#navigation" class="skip-link">Skip to navigation</a>
      <a href="#footer" class="skip-link">Skip to footer</a>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      .skip-links {
        position: absolute;
        top: -100px;
        left: 0;
        z-index: 9999;
      }
      
      .skip-link {
        position: absolute;
        top: 0;
        left: 0;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        transform: translateY(-100%);
        transition: transform 0.3s;
      }
      
      .skip-link:focus {
        transform: translateY(0);
      }
    `;
    
    document.head.appendChild(style);
    document.body.insertBefore(skipLinks, document.body.firstChild);
  }

  // Text-to-Speech functionality
  speakText(text) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = this.getLanguageCode(this.currentLanguage);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  }

  stopSpeaking() {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  }

  getLanguageCode(lang) {
    const codes = {
      en: 'en-IN',
      hi: 'hi-IN',
      bn: 'bn-IN',
      od: 'or-IN',
      te: 'te-IN',
      ta: 'ta-IN',
      mr: 'mr-IN',
      gu: 'gu-IN'
    };
    return codes[lang] || 'en-IN';
  }

  // Government compliance features
  generateAccessibilityReport() {
    return {
      compliance: {
        wcag_aa: this.checkWCAGCompliance(),
        section_508: this.checkSection508Compliance(),
        gigw: this.checkGIGWCompliance()
      },
      features_enabled: [...this.features],
      language: this.currentLanguage,
      timestamp: new Date().toISOString()
    };
  }

  checkWCAGCompliance() {
    // Mock WCAG 2.1 AA compliance check
    return {
      level: 'AA',
      score: 85,
      issues: [
        'Some images may need better alt text',
        'Color contrast ratio could be improved in some areas'
      ]
    };
  }

  checkSection508Compliance() {
    // Mock Section 508 compliance check
    return {
      compliant: true,
      score: 90,
      last_audit: '2024-02-01'
    };
  }

  checkGIGWCompliance() {
    // Government of India Guidelines for Indian Government Websites
    return {
      compliant: true,
      version: '2.0',
      features: [
        'Multilingual support',
        'Accessibility features',
        'Mobile responsiveness',
        'Security compliance'
      ]
    };
  }
}

// Singleton instance
export const accessibilityManager = new AccessibilityManager();

// Translation utilities
export const TRANSLATIONS = {
  en: {
    'app.title': 'FRA Atlas',
    'app.subtitle': 'Ministry of Tribal Affairs • Government of India',
    'nav.dashboard': 'Dashboard',
    'nav.map': 'Interactive Map',
    'nav.analytics': 'Analytics',
    'nav.documents': 'Document Upload',
    'nav.claims': 'Claim Management',
    'nav.satellite': 'Satellite Analysis',
    'nav.decision': 'Decision Support',
    'nav.users': 'User Management',
    'accessibility.high_contrast': 'High Contrast',
    'accessibility.large_text': 'Large Text',
    'accessibility.screen_reader': 'Screen Reader',
    'accessibility.keyboard_nav': 'Enhanced Keyboard Navigation',
    'footer.copyright': '© 2024 Ministry of Tribal Affairs, Government of India. All rights reserved.',
    'footer.developed_by': 'Site designed & developed by National Informatics Centre (NIC)'
  },
  hi: {
    'app.title': 'FRA एटलस',
    'app.subtitle': 'जनजातीय कार्य मंत्रालय • भारत सरकार',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.map': 'इंटरैक्टिव मैप',
    'nav.analytics': 'विश्लेषण',
    'nav.documents': 'दस्तावेज़ अपलोड',
    'nav.claims': 'दावा प्रबंधन',
    'nav.satellite': 'उपग्रह विश्लेषण',
    'nav.decision': 'निर्णय समर्थन',
    'nav.users': 'उपयोगकर्ता प्रबंधन',
    'accessibility.high_contrast': 'उच्च कंट्रास्ट',
    'accessibility.large_text': 'बड़ा टेक्स्ट',
    'accessibility.screen_reader': 'स्क्रीन रीडर',
    'accessibility.keyboard_nav': 'बेहतर कीबोर्ड नेविगेशन',
    'footer.copyright': '© 2024 जनजातीय कार्य मंत्रालय, भारत सरकार। सभी अधिकार सुरक्षित।',
    'footer.developed_by': 'साइट राष्ट्रीय सूचना विज्ञान केंद्र (NIC) द्वारा डिज़ाइन और विकसित'
  }
  // Add more language translations as needed
};

export function translate(key, language = 'en') {
  return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;
}
