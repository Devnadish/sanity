import { SchemaTypeDefinition } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const mediaLibrary: SchemaTypeDefinition = {
  name: "mediaLibrary",
  title: "Media Library",
  type: "document",
  icon: ImageIcon,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "mediaType",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Document", value: "document" },
          { title: "Video", value: "video" },
        ],
      },
    },
    {
      name: "file",
      title: "File",
      type: "file",
      options: {
        storeOriginalFilename: true,
      },
    },
    {
      name: "altText",
      title: "Alt Text",
      type: "string",
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "file",
    },
  },
};