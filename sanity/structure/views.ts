import { StructureBuilder, DefaultDocumentNodeResolver } from 'sanity/structure'

export const createCustomView = (
  S: StructureBuilder,
  title: string,
  filter: string
) => {
  return S.documentList()
    .title(title)
    .filter(filter);
};

export const getDefaultDocumentNode: DefaultDocumentNodeResolver = (
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