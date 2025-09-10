import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      title: "Excerpt",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      title: "Category",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "datetime",
      type: "datetime",
      title: "Published Date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      type: "string",
      title: "Author",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readTime",
      type: "string",
      title: "Read Time",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      type: "string",
      title: "Emoji Image",
      description: "Emoji to represent the post (e.g., 🤖)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: "mainImage",
      type: "image",
      title: "Main Image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featuredStatus",
      type: "number",
      title: "Featured Status",
      description: "0 = Regular post, 1 = Sub-featured, 2 = Main featured",
      options: {
        list: [
          { title: "Regular Post", value: 0 },
          { title: "Sub-featured", value: 1 },
          { title: "Main Featured", value: 2 },
        ],
      },
      validation: (Rule) => Rule.required().min(0).max(2),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author",
      image: "image",
      category: "category",
    },
    prepare(selection) {
      const { title, author, image, category } = selection;
      return {
        title: title,
        subtitle: `${category} • by ${author}`,
        media: () => image,
      };
    },
  },
});
