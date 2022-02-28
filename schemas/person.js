import {UserIcon} from '@sanity/icons'
import {isSlugUnique} from '@sanity/document-internationalization/lib/validators'

export default {
  name: 'person',
  title: 'Person',
  type: 'document',
  icon: UserIcon,
  i18n: {
    base: 'en_US',
    languages: ['en_US', 'nl_NL'],
    fieldNames: {
      lang: '__i18n_lang',
      references: '__i18n_refs',
      baseReference: '__i18n_base',
    },
  },
  initialValue: {
    __i18n_lang: 'en_US',
  },
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Please use "Firstname Lastname" format',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
      // validation: isSlugUnique
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {title: 'name', media: 'image'},
  },
}
