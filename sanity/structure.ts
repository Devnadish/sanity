import type { StructureResolver } from "sanity/structure";
import {
  DocumentTextIcon,
  TagIcon,
  UserIcon,
  EarthGlobeIcon,
  TranslateIcon,
  ComposeIcon,
  MenuIcon,
  BlockContentIcon,
  ImageIcon,
  DocumentIcon,
} from "@sanity/icons";

// =========================================
// Configuration Constants
// =========================================
const SECTIONS = {
  SERVICE: "service",
  TECHNOLOGY: "technology",
  SUPPORT: "support",
  FREE: "free",
  BLOG: "blog"
} as const;

const LANGUAGES = {
  EN: "en",
  AR: "ar"
} as const;

// =========================================
// Helper Types
// =========================================
type Section = typeof SECTIONS[keyof typeof SECTIONS];
type Language = typeof LANGUAGES[keyof typeof LANGUAGES];

// =========================================
// Helper Functions
// =========================================

const createLanguageList = (S: any, title: string, language: Language) => {
  return S.documentList()
    .title(title)
    .filter('_type == "post" && language == $language')
    .params({ language });
};

const createSectionList = (S: any, title: string, language: Language, section: Section) => {
  return S.documentList()
    .title(title)
    .filter('_type == "post" && language == $language && section == $section')
    .params({ language, section });
};

const createSectionItems = (S: any, language: Language) => {
  return [
    S.listItem()
      .title('Services')
      .icon(MenuIcon)
      .child(createSectionList(S, 'Services', language, SECTIONS.SERVICE)),
    S.listItem()
      .title('Technology')
      .icon(BlockContentIcon)
      .child(createSectionList(S, 'Technology', language, SECTIONS.TECHNOLOGY)),
    S.listItem()
      .title('Support')
      .icon(ComposeIcon)
      .child(createSectionList(S, 'Support', language, SECTIONS.SUPPORT)),
    S.listItem()
      .title('Free')
      .icon(TagIcon)
      .child(createSectionList(S, 'Free', language, SECTIONS.FREE)),
    S.listItem()
      .title('Blog')
      .icon(DocumentTextIcon)
      .child(createSectionList(S, 'Blog', language, SECTIONS.BLOG))
  ];
};

const createLanguageStructure = (S: any, title: string, language: Language, icon: any) => {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.list()
        .title(title)
        .items([
          S.listItem()
            .title('All Content')
            .icon(DocumentTextIcon)
            .child(createLanguageList(S, 'All Content', language)),
          S.divider(),
          ...createSectionItems(S, language)
        ])
    );
};

// Media Asset Management
const createMediaStructure = (S: any) => {
  return S.listItem()
    .title('Media Library')
    .icon(ImageIcon)
    .child(
      S.list()
        .title('Media Library')
        .items([
          // Custom Media Library
          S.documentTypeListItem('mediaLibrary')
            .title('Media Manager')
            .icon(ImageIcon),
          
          S.divider(),
          
          // System Assets
          S.listItem()
            .title('System Images')
            .icon(ImageIcon)
            .child(
              S.documentTypeList('sanity.imageAsset')
                .title('System Images')
                .filter('_type == "sanity.imageAsset"')
            ),
          
          S.listItem()
            .title('System Files')
            .icon(DocumentIcon)
            .child(
              S.documentTypeList('sanity.fileAsset')
                .title('System Files')
                .filter('_type == "sanity.fileAsset"')
            ),
        ])
    );
};

// =========================================
// Main Structure
// =========================================
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // English Content
      createLanguageStructure(S, 'English Content', LANGUAGES.EN, EarthGlobeIcon),
      
      // Arabic Content
      createLanguageStructure(S, 'Arabic Content', LANGUAGES.AR, TranslateIcon),
      
      S.divider(),
      
      // Media Library
      createMediaStructure(S),
      
      S.divider(),
      
      // Categories
      S.documentTypeListItem('category')
        .title('Categories')
        .icon(TagIcon),
      
      // Authors
      S.documentTypeListItem('author')
        .title('Authors')
        .icon(UserIcon),
    ]);