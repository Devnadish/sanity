import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const departmentType = defineType({
  name: "department",
  title: "Department",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
  ],
});
