import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        defineField({
          name: "en",
          title: "English Title",
          type: "string",
        }),
        defineField({
          name: "ar",
          title: "Arabic Title",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title.en", // Use the English title for slug generation
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        defineField({
          name: "en",
          title: "English Description",
          type: "text",
        }),
        defineField({
          name: "ar",
          title: "Arabic Description",
          type: "text",
        }),
      ],
    }),
  ],
});

// import { TagIcon } from "@sanity/icons";
// import { defineField, defineType } from "sanity";

// export const categoryType = defineType({
//   name: "category",
//   title: "Category",
//   type: "document",
//   icon: TagIcon,
//   fields: [
//     defineField({
//       name: "title1",
//       type: "string",
//     }),
//     defineField({
//       name: "slug",
//       type: "slug",
//       options: {
//         source: "title",
//       },
//     }),
//     defineField({
//       name: "description",
//       type: "text",
//     }),
//   ],
// });
