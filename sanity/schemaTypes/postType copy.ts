import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType, defineArrayMember } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: rule => rule.required().min(10).max(100),
      description: "The main title of the post (important for SEO)"
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 96)
      },
      validation: rule => rule.required(),
      description: "URL-friendly version of the post title"
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      validation: rule => rule.required().min(50).max(200),
      description: "A brief description for SEO and previews"
    }),
    defineField({
      name: "author",
      type: "reference",
      to: { type: "author" },
      validation: rule => rule.required(),
      description: "Who wrote this post?"
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessibility",
          validation: rule => rule.required()
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
          description: "Optional image caption"
        }
      ],
      validation: rule => rule.required()
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      validation: rule => rule.required().min(1),
      description: "Categories help organize your content"
    }),
    defineField({
      name: "department",
      type: "reference",
      to: { type: "department" },
      validation: rule => rule.required(),
      description: "Which department does this post belong to?"
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: 'tags'
      },
      description: "Add relevant tags for better content organization"
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      validation: rule => rule.required(),
      initialValue: () => new Date().toISOString(),
      description: "When should this post be published?"
    }),
    defineField({
      name: "body",
      title: "Content",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [{title: 'Bullet', value: 'bullet'}],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
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
              validation: rule => rule.required()
            },
            {
              name: "caption",
              type: "string",
              title: "Caption"
            }
          ]
        })
      ],
      validation: rule => rule.required(),
      description: "The main content of the post"
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "object",
      description: "Search Engine Optimization settings",
      fields: [
        {
          name: "metaTitle",
          type: "string",
          description: "Override the default title (max 60 characters)",
          validation: rule => rule.max(60)
        },
        {
          name: "metaDescription",
          type: "text",
          rows: 3,
          description: "Override the default description (max 160 characters)",
          validation: rule => rule.max(160)
        },
        {
          name: "keywords",
          type: "array",
          of: [{ type: "string" }],
          options: {
            layout: 'tags'
          },
          description: "Keywords for search engines"
        },
        {
          name: "canonicalUrl",
          type: "url",
          description: "Optional: Set a canonical URL if this content exists elsewhere"
        }
      ]
    }),
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true
    })
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
      publishedAt: "publishedAt"
    },
    prepare(selection) {
      const { author, publishedAt } = selection;
      return {
        ...selection,
        subtitle: author && publishedAt ? 
          `by ${author} • ${new Date(publishedAt).toLocaleDateString()}` : 
          author ? `by ${author}` : ''
      };
    },
  },
  orderings: [
    {
      title: 'Publication Date, New',
      name: 'publishedAtDesc',
      by: [
        {field: 'publishedAt', direction: 'desc'}
      ]
    },
    {
      title: 'Publication Date, Old',
      name: 'publishedAtAsc',
      by: [
        {field: 'publishedAt', direction: 'asc'}
      ]
    }
  ]
});