// Number formatting utility for different languages
// Converts numbers to localized formats based on the selected language

const numberSystems = {
  en: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  hi: ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'], // Devanagari (Hindi)
  od: ['୦', '୧', '୨', '୩', '୪', '୫', '୬', '୭', '୮', '୯'], // Odia
  te: ['౦', '౧', '౨', '౩', '౪', '౫', '౬', '౭', '౮', '౯'], // Telugu
  bn: ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'], // Bengali
};

/**
 * Converts a number to the localized number system
 * @param {number|string} num - The number to convert
 * @param {string} language - Language code (en, hi, od, te, bn)
 * @returns {string} - Localized number string
 */
export const formatNumber = (num, language = 'en') => {
  if (num === null || num === undefined) return '';
  
  const numStr = String(num);
  const digits = numberSystems[language] || numberSystems.en;
  
  return numStr.split('').map(char => {
    if (char >= '0' && char <= '9') {
      return digits[parseInt(char)];
    }
    return char; // Keep non-numeric characters (commas, periods, etc.)
  }).join('');
};

/**
 * Formats a number with thousand separators and converts to local number system
 * @param {number} num - The number to format
 * @param {string} language - Language code
 * @returns {string} - Formatted and localized number
 */
export const formatNumberWithCommas = (num, language = 'en') => {
  if (num === null || num === undefined) return '';
  
  const formattedNum = Number(num).toLocaleString('en-US');
  return formatNumber(formattedNum, language);
};

/**
 * Formats a percentage value
 * @param {number} num - The percentage value
 * @param {string} language - Language code
 * @returns {string} - Formatted percentage
 */
export const formatPercentage = (num, language = 'en') => {
  if (num === null || num === undefined) return '';
  
  return formatNumber(num, language) + '%';
};

export default {
  formatNumber,
  formatNumberWithCommas,
  formatPercentage,
};
