// Number localization utility for converting numbers to different language scripts
// Supports: English, Hindi, Bengali, Odia, Telugu

// Digit mappings for different languages
const digitMappings = {
  en: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  hi: ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'], // Hindi/Devanagari
  bn: ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'], // Bengali
  od: ['୦', '୧', '୨', '୩', '୪', '୫', '୬', '୭', '୮', '୯'], // Odia
  te: ['౦', '౧', '౨', '౩', '౪', '౫', '౬', '౭', '౮', '౯'], // Telugu
};

/**
 * Convert English digits to the specified language's digits
 * @param {string|number} num - The number to convert
 * @param {string} lang - The language code (en, hi, bn, od, te)
 * @returns {string} - The number with localized digits
 */
export const localizeNumber = (num, lang = 'en') => {
  if (num === null || num === undefined) return '';
  
  // Convert to string and handle negative numbers
  const numStr = String(num);
  const isNegative = numStr.startsWith('-');
  const cleanNum = isNegative ? numStr.slice(1) : numStr;
  
  // Get the digit mapping for the language, default to English
  const digits = digitMappings[lang] || digitMappings.en;
  
  // Convert each digit
  const localized = cleanNum.replace(/\d/g, (digit) => digits[parseInt(digit)]);
  
  // Add back the negative sign if needed
  return isNegative ? `-${localized}` : localized;
};

/**
 * Format a number with thousands separators and localize digits
 * @param {number} num - The number to format
 * @param {string} lang - The language code
 * @param {object} options - Formatting options
 * @returns {string} - Formatted and localized number
 */
export const formatLocalizedNumber = (num, lang = 'en', options = {}) => {
  if (num === null || num === undefined) return '';
  
  const {
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
    useGrouping = true,
  } = options;
  
  // Format the number with separators using standard formatting
  const formatted = Number(num).toLocaleString('en-IN', {
    minimumFractionDigits,
    maximumFractionDigits,
    useGrouping,
  });
  
  // Then localize the digits
  return localizeNumber(formatted, lang);
};

/**
 * Format a percentage value with localized digits
 * @param {number} num - The percentage value
 * @param {string} lang - The language code
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted percentage with localized digits
 */
export const formatLocalizedPercentage = (num, lang = 'en', decimals = 1) => {
  if (num === null || num === undefined) return '';
  
  const formatted = Number(num).toFixed(decimals);
  return localizeNumber(formatted, lang);
};

/**
 * Format a date with localized numbers
 * @param {Date} date - The date to format
 * @param {string} lang - The language code
 * @returns {string} - Formatted date with localized numbers
 */
export const formatLocalizedDate = (date, lang = 'en') => {
  if (!date) return '';
  
  // Format date in standard format first
  const formatted = new Date(date).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Localize only the numbers in the date
  return localizeNumber(formatted, lang);
};

export default {
  localizeNumber,
  formatLocalizedNumber,
  formatLocalizedPercentage,
  formatLocalizedDate,
};
