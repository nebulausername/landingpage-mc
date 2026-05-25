import en from './en';
import de from './de';
import es from './es';
import type { Lang, Translations } from '../types';

export const translations: Record<Lang, Translations> = { en, de, es };

export function getTranslation(lang: Lang): Translations {
  return translations[lang] ?? translations.en;
}
