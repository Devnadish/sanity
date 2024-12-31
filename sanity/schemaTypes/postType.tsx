import { 
  CogIcon, 
  DocumentTextIcon, 
  ImageIcon, 
  EditIcon,
  SearchIcon,
  TagIcon,
  UserIcon,
  CalendarIcon
} from "@sanity/icons";
import { defineField, defineType, Image } from "sanity";

interface SanityImageAsset {
  _type: 'reference';
  _ref: string;
  metadata: {
    dimensions: {
      aspectRatio: number;
      height: number;
      width: number;
    };
    lqip?: string;
    hasAlpha?: boolean;
    isOpaque?: boolean;
  };
}

interface ImageField {
  asset: SanityImageAsset;
  crop?: {
    _type: 'sanityImageCrop';
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  hotspot?: {
    _type: 'sanityImageHotspot';
    x: number;
    y: number;
    height: number;
    width: number;
  };
  alt?: string;
  caption?: string;
}

interface PreviewSelection {
  title: string;
  author?: string;
  media?: any;
  publishedAt?: string;
}

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    {
      name: "general",
      title: "General Information",
      icon: CogIcon,
      default: true,
    },
    {
      name: "content",
      title: "Content",
      icon: EditIcon,
    },
    {
      name: "media",
      title: "Media",
      icon: ImageIcon,
    },
    {
      name: "metadata",
      title: "Metadata",
      icon: TagIcon,
    },
    {
      name: "seo",
      title: "SEO",
      icon: SearchIcon,
    }
  ],
  fields: [
    // Language Selection
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
      group: ["general", "seo"]
    }),

    // Section Selection
    defineField({
      name: "section",
      type: "string",
      options: {
        list: [
          { title: "Services", value: "service" },
          { title: "Technology", value: "technology" },
          { title: "Support", value: "support" },
          { title: "Free", value: "free" },
          { title: "Blog", value: "blog" }
        ]
      },
      validation: rule => rule.required(),
      title: "Section",
      description: "Select the content section",
      group: "general"
    }),

    // Order for Display
    defineField({
      name: "order",
      type: "string",
      validation: rule => rule.min(1).max(2),
      description: "Order to display data",
      group: "general"
    }),

    // Title
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: rule => rule.required(),
      group: ["general", "seo"]
    }),

    // Slug
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: rule => rule.required(),
      group: ["general", "seo"]
    }),

    // Description
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: rule => rule.required(),
      group: ["general", "seo"]
    }),

    // Main Image
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      description: "Upload or select a high-quality image. Recommended size: 1920x1080px or larger.",
      options: {
        hotspot: true,
        metadata: ["blurhash", "lqip", "palette"],
        storeOriginalFilename: true,
        accept: "image/jpeg, image/png, image/webp, image/avif",
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility. Describe the image for screen readers.',
          validation: Rule => Rule.required().min(10).max(120)
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption to display below the image'
        }
      ],
      group: ["media", "seo"],
    }),

    // Gallery
    defineField({
      name: "gallery",
      title: "Image Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
            metadata: ["blurhash", "lqip", "palette"],
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: Rule => Rule.required()
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption'
            }
          ],
        }
      ],
      options: {
        layout: "grid",
      },
      group: "media"
    }),

    // Content
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block"
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              validation: Rule => Rule.required()
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }
          ]
        }
      ],
      group: "content"
    }),

    // Published At
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: ["metadata", "seo"]
    }),

    // Author
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{type: "author"}],
      group: ["metadata", "seo"]
    }),

    // Categories
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{type: "reference", to: {type: "category"}}],
      group: "metadata"
    }),

    // SEO
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "object",
      group: "seo",
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          validation: Rule => Rule.max(60)
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          validation: Rule => Rule.max(160)
        },
        {
          name: "keywords",
          title: "Keywords",
          type: "array",
          of: [{type: "string"}],
          options: {
            layout: "tags"
          }
        }
      ]
    })
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
      publishedAt: "publishedAt"
    },
    prepare(selection: PreviewSelection) {
      const {title, author, media, publishedAt} = selection;
      return {
        title,
        subtitle: author && `by ${author}${
          publishedAt ? ` (${new Date(publishedAt).toLocaleDateString()})` : ''
        }`,
        media
      };
    }
  },

  orderings: [
    {
      title: "Publication Date, New",
      name: "publishedAtDesc",
      by: [
        {field: "publishedAt", direction: "desc"}
      ]
    },
    {
      title: "Publication Date, Old",
      name: "publishedAtAsc",
      by: [
        {field: "publishedAt", direction: "asc"}
      ]
    }
  ]
});





