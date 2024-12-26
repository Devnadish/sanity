// sanity/structure.ts
import type { StructureResolver } from "sanity/structure";
import {
  DocumentTextIcon,
  TagIcon,
  UserIcon,
  RocketIcon,
  EarthGlobeIcon,
  TranslateIcon,
} from "@sanity/icons";

const getLocalizedItems = (S: any, schemaType: string) => {
  return [
    S.listItem()
      .title("English Content")
      .icon(EarthGlobeIcon)
      .child(
        S.documentList()
          .title("English Content")
          .filter('_type == $type && language == "en"')
          .params({ type: schemaType })
      ),
    S.listItem()
      .title("Arabic Content")
      .icon(TranslateIcon)
      .child(
        S.documentList()
          .title("Arabic Content")
          .filter('_type == $type && language == "ar"')
          .params({ type: schemaType })
      ),
    S.divider(),
    S.listItem()
      .title("All Content")
      .icon(DocumentTextIcon)
      .child(
        S.documentList()
          .title("All Content")
          .filter("_type == $type")
          .params({ type: schemaType })
      ),
  ];
};

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content Management")
    .items([
      // Posts Section
      S.listItem()
        .title("Posts")
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title("Posts")
            .items([
              ...getLocalizedItems(S, "post"),
              S.listItem()
                .title("By Category")
                .icon(TagIcon)
                .child(
                  S.documentTypeList("category")
                    .title("Posts by Category")
                    .child((categoryId) =>
                      S.documentList()
                        .title("Posts")
                        .filter(
                          '_type == "post" && $categoryId in categories[]._ref'
                        )
                        .params({ categoryId })
                    )
                ),
            ])
        ),

      // Blog Section
      S.listItem()
        .title("Blog")
        .icon(DocumentTextIcon)
        .child(
          S.list().title("Blog Content").items(getLocalizedItems(S, "blog"))
        ),

      S.divider(),

      // Categories with Language Support
      S.listItem()
        .title("Categories")
        .icon(TagIcon)
        .child(
          S.list().title("Categories").items(getLocalizedItems(S, "category"))
        ),

      // Authors
      S.listItem()
        .title("Authors")
        .icon(UserIcon)
        .child(S.documentTypeList("author")),

      S.divider(),

      // Settings & Configuration
      S.listItem()
        .title("Settings")
        .icon(RocketIcon)
        .child(
          S.list()
            .title("Settings")
            .items([
              // Add your settings documents here
              S.listItem()
                .title("Navigation")
                .child(
                  S.document().schemaType("navigation").documentId("navigation")
                ),
            ])
        ),

      // Filter out types that are handled explicitly
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["post", "category", "author", "blog", "navigation"].includes(
            listItem.getId() ?? ""
          )
      ),
    ]);

// import type { StructureResolver } from "sanity/structure";

// // https://www.sanity.io/docs/structure-builder-cheat-sheet
// export const structure: StructureResolver = (S) =>
//   S.list()
//     .title("Blog")
//     .items([
//       S.documentTypeListItem("post").title("Sections List"),
//       S.documentTypeListItem("blog").title("Blog sections"),
//       S.documentTypeListItem("author").title("Authors"),
//       S.documentTypeListItem("category").title("Categories"),
//       S.divider(),
//       ...S.documentTypeListItems().filter(
//         (item) =>
//           item.getId() &&
//           !["post", "category", "author", "blog"].includes(item.getId()!)
//       ),
//     ]);
