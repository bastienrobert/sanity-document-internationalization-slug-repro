import {MdLocalPlay as icon} from 'react-icons/md'

export default {
  name: 'screening',
  title: 'Screening',
  type: 'document',
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
  icon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'E.g.: Our first ever screening of Gattaca',
    },
    {
      name: 'movie',
      title: 'Movie',
      type: 'reference',
      to: [{type: 'movie'}],
      description: 'Which movie are we screening',
    },
    {
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Set to published when this screening should be visible on a front-end',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'geopoint',
      description: 'Where will the screening take place?',
    },
    {
      name: 'beginAt',
      title: 'Starts at',
      type: 'datetime',
      description: 'When does the screening start?',
    },
    {
      name: 'endAt',
      title: 'Ends at',
      type: 'datetime',
      description: 'When does the screening end?',
    },
    {
      name: 'allowedGuests',
      title: 'Who can come?',
      type: 'string',
      options: {
        list: [
          {title: 'Members', value: 'members'},
          {title: 'Members and friends', value: 'friends'},
          {title: 'Anyone', value: 'anyone'},
        ],
        layout: 'radio',
      },
    },
    {
      name: 'infoUrl',
      title: 'More info at',
      type: 'url',
      description:
        'URL to imdb.com, rottentomatoes.com or some other place with reviews, stats, etc',
    },
    {
      name: 'ticket',
      title: 'Ticket',
      type: 'file',
      description: 'PDF for printing a physical ticket',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'movie.poster',
    },
  },
}
