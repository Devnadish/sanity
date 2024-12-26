// structure/views.ts
import { StructureBuilder } from "sanity/desk";

export const createCustomView = (
  S: StructureBuilder,
  title: string,
  filter: string
) => {
  return S.view.component().title(title).filter(filter);
};

export const defaultDocumentNode = (
  S: StructureBuilder,
  { schemaType }: { schemaType: string }
) => {
  // Add custom views based on schema type
  switch (schemaType) {
    case "post":
      return S.document().views([
        S.view.form(),
        // Add custom views for posts here
      ]);
    default:
      return S.document().views([S.view.form()]);
  }
};
