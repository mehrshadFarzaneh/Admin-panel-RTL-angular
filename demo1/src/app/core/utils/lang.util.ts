export class LangUtil {
  static isRtlLang(language: string): boolean {
    // List of RTL languages
    const rtlLanguages = [
      'fa', // Persian
      'ar', // Arabic
      'he', // Hebrew
      'ur', // Urdu
      // [Todo]: Add more RTL languages as needed
    ];
    const lowercasedLanguage = language.toLowerCase();
    return rtlLanguages.includes(lowercasedLanguage);
  }
}
