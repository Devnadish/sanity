// sanity/utils/languageUtils.ts
import { TranslateIcon, EarthGlobeIcon } from "@sanity/icons";

export const LANGUAGES = {
  en: {
    id: "en",
    title: "English",
    icon: EarthGlobeIcon,
  },
  ar: {
    id: "ar",
    title: "Arabic",
    icon: TranslateIcon,
  },
};

export const getLanguageTitle = (lang: keyof typeof LANGUAGES) =>
  LANGUAGES[lang]?.title || lang;

export function createLanguageFilter(schemaType: string, language?: string) {
  return language
    ? `_type == "${schemaType}" && language == "${language}"`
    : `_type == "${schemaType}"`;
}
