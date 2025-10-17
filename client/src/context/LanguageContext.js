import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../translations/translations';

// Create Language Context
const LanguageContext = createContext();

// Custom hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Language Provider Component
export const LanguageProvider = ({ children }) => {
  // Get saved language from localStorage or default to 'en'
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('fra_language');
    return savedLanguage || 'en';
  });

  // Save language preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('fra_language', currentLanguage);
    // Update HTML lang attribute for accessibility
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  // Function to change language
  const changeLanguage = (languageCode) => {
    if (translations[languageCode]) {
      setCurrentLanguage(languageCode);
    }
  };

  // Translation function - gets text by key
  const t = (key) => {
    const translation = translations[currentLanguage]?.[key];
    // Fallback to English if translation not found
    return translation || translations.en[key] || key;
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    translations: translations[currentLanguage],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
