import { CogIcon, DocumentIcon } from "@sanity/icons";
import { defineField, defineType, defineArrayMember } from "sanity";

export const blogType = defineType({
  name: "blog",
  title: "Blog",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "general",
      title: "GENERAL",
      icon: CogIcon, // optional
      default: true,
    },
    {
      name: "image",
      title: "IMAGES",
    },
    {
      name: "content",
      title: "CONTENT",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: "general",
      validation: (rule) => rule.required().min(10).max(100),
      description: "The title of the blog post",
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "general",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      type: "string",
      group: "general",
      description: "A catchy subtitle for your blog post",
    }),
    defineField({
      name: "author",
      type: "string",
      group: "general",
      description: "Who wrote this post?",
      initialValue: "khalid nadish",
    }),
    defineField({
      name: "mainImage",
      type: "image",
      group: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessibility",
          validation: (rule) => rule.required(),
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categories",
      type: "string",
      group: "general",
      description: "Select the categories for this blog post",
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      group: "general",
    }),

    defineField({
      name: "content",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
              validation: (rule) => rule.required(),
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Published at",
      description: "The date and time when the blog post was published",
      group: "general",
      validation: (rule) => rule.required(),
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "object",
      group: "seo",
      fields: [
        {
          name: "metaTitle",
          type: "string",
          validation: (rule) => rule.max(60),
        },
        {
          name: "metaDescription",
          type: "text",
          validation: (rule) => rule.max(160),
        },
        {
          name: "keywords",
          type: "array",
          of: [{ type: "string" }],
          options: {
            layout: "tags",
          },
        },
      ],
    }),
    defineField({
      name: "language",
      type: "string",
      readOnly: false,
      hidden: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
      publishedAt: "publishedAt",
    },
    prepare(selection) {
      const { author, publishedAt } = selection;
      return {
        ...selection,
        subtitle:
          author && publishedAt
            ? `by ${author} • ${new Date(publishedAt).toLocaleDateString()}`
            : author
              ? `by ${author}`
              : "",
      };
    },
  },
  orderings: [
    {
      title: "Publication Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Publication Date, Old",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
  ],
});

// {name: 'seoTitle', title: 'SEO title', type: 'string', group: 'seo'},
//     {name: 'seoKeywords', title: 'Keywords', type: 'string', group: 'seo'},
//     {name: 'seoSlug', title: 'Slug', type: 'slug', group: 'seo'},
//     {name: 'seoImage', title: 'Image', type: 'image', group: 'seo'},
