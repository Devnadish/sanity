import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType, defineArrayMember } from "sanity";

export const blogType = defineType({
  name: "blog",
  title: "Blog",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: rule => rule.required().min(10).max(100),
      description: "The title of the blog post"
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
      validation: rule => rule.required()
    }),
    defineField({
      name: "subtitle",
      type: "string",
      description: "A catchy subtitle for your blog post"
    }),
    defineField({
      name: "author",
      type: "reference",
      to: { type: "author" },
      validation: rule => rule.required()
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
          title: "Caption"
        }
      ],
      validation: rule => rule.required()
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      validation: rule => rule.required().min(1)
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      validation: rule => rule.required().min(50).max(200),
      description: "A short summary of the blog post for previews and SEO"
    }),
    defineField({
      name: "content",
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
              {title: 'Code', value: 'code'},
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
      validation: rule => rule.required()
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      validation: rule => rule.required(),
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: "featured",
      type: "boolean",
      description: "Set to true to feature this post",
      initialValue: false
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          type: "string",
          validation: rule => rule.max(60)
        },
        {
          name: "metaDescription",
          type: "text",
          validation: rule => rule.max(160)
        },
        {
          name: "keywords",
          type: "array",
          of: [{ type: "string" }],
          options: {
            layout: 'tags'
          }
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