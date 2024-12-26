// import type { StructureResolver } from "sanity/structure";
// import { ListItem, StructureBuilder ,DefaultDocumentNodeResolver} from "sanity/structure";

// import Iframe from 'sanity-plugin-iframe-pane'
// import { SanityDocument } from 'sanity'

// export const createCustomView = (
//   S: StructureBuilder,
//   title: string,
//   filter: string
// ) => {
//   return S.documentList()
//     .title(title)
//     .filter(filter)
// }

// export const getDefaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
//   // Add custom views based on schema type
//   switch (schemaType) {
//     case "post":
//       return S.document().views([
//         // Form view
//         S.view.form(),
        
//         // Preview view
//         S.view
//           .component(Iframe)
//           .options({
//             url: (doc: SanityDocument) => 
//               doc?.slug?.current
//                 ? `${process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'}/posts/${doc.slug.current}`
//                 : `${process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'}`,
//           })
//           .title('Preview')
//       ])
//     default:
//       return S.document().views([S.view.form()])
//   }
// }


// // // structure/index.ts
// // import type { StructureResolver } from "sanity/desk";
// // import { ListItem, StructureBuilder } from "sanity/desk";
// // import { DocumentTextIcon, TagIcon, UserIcon, RocketIcon } from "@sanity/icons";

// // // Custom types for type safety
// // type Section = {
// //   title: string;
// //   icon: any;
// //   schemaType: string;
// //   filter?: string;
// // };

// // // Define main sections
// // const sections: Section[] = [
// //   {
// //     title: "All Posts",
// //     icon: DocumentTextIcon,
// //     schemaType: "post",
// //   },
// //   {
// //     title: "Blog Posts",
// //     icon: DocumentTextIcon,
// //     schemaType: "post",
// //     filter: 'department._ref == *[_type=="department" && title=="Blog"][0]._id',
// //   },
// //   {
// //     title: "Service Posts",
// //     icon: DocumentTextIcon,
// //     schemaType: "post",
// //     filter:
// //       'department._ref == *[_type=="department" && title=="Service"][0]._id',
// //   },
// // ];

// // // Function to create filtered list
// // const createFilteredList = (
// //   S: StructureBuilder,
// //   title: string,
// //   type: string,
// //   filter?: string
// // ) => {
// //   return S.listItem()
// //     .title(title)
// //     .child(
// //       S.documentList()
// //         .title(title)
// //         .filter(`_type == "${type}"${filter ? ` && ${filter}` : ""}`)
// //     );
// // };

// // // Function to create category-based list
// // const createCategoryList = (S: StructureBuilder) => {
// //   return S.listItem()
// //     .title("Posts by Category")
// //     .child(
// //       S.documentTypeList("category")
// //         .title("Categories")
// //         .child((categoryId) =>
// //           S.documentList()
// //             .title("Posts")
// //             .filter('_type == "post" && $categoryId in categories[]._ref')
// //             .params({ categoryId })
// //         )
// //     );
// // };

// // export const structure: StructureResolver = (S) =>
// //   S.list()
// //     .title("Content")
// //     .items([
// //       // Posts Management
// //       S.listItem()
// //         .title("Posts Management")
// //         .icon(DocumentTextIcon)
// //         .child(
// //           S.list()
// //             .title("Posts Management")
// //             .items([
// //               ...sections.map((section) =>
// //                 createFilteredList(
// //                   S,
// //                   section.title,
// //                   section.schemaType,
// //                   section.filter
// //                 )
// //               ),
// //               createCategoryList(S),
// //             ])
// //         ),

// //       S.divider(),

// //       // Taxonomy Management
// //       S.listItem()
// //         .title("Taxonomy")
// //         .child(
// //           S.list()
// //             .title("Taxonomy")
// //             .items([
// //               S.documentTypeListItem("category")
// //                 .title("Categories")
// //                 .icon(TagIcon),
// //               S.documentTypeListItem("department")
// //                 .title("Departments")
// //                 .icon(RocketIcon),
// //             ])
// //         ),

// //       S.divider(),

// //       // Author Management
// //       S.listItem()
// //         .title("Authors")
// //         .icon(UserIcon)
// //         .child(S.documentTypeList("author")),

// //       S.divider(),

// //       // Settings & Configuration
// //       S.listItem().title("Settings").child(
// //         S.list().title("Settings").items([
// //           // Add your settings documents here
// //         ])
// //       ),
// //     ]);
