import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Annons',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'marke',
      title: 'Märke & Modell',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'author',
      title: 'Säljare:',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'huvudbild',
      title: 'Huvudbild',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'kategorier',
      title: 'Kategorie',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      title: 'Plats',
      name: 'plats',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'plats'}
          ]
        }
      ]
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'beskrivning',
      title: 'Beskrivning',
      type: 'blockContent',
    }),
  ],

})
