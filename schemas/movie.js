import {MdLocalMovies as icon} from 'react-icons/md'
import {isSlugUnique} from '@sanity/document-internationalization/lib/validators'
import {getBaseIdFromId, getSanityClient, serializePath} from '@sanity/document-internationalization/lib/utils'

// from https://github.com/sanity-io/gridsome-source-sanity/blob/master/src/draftHandlers.js#L15
function unprefixDraftId(id) {
  return id.replace(/^drafts\./, '')
}

export default {
  name: 'movie',
  title: 'Movie',
  type: 'document',
  icon,
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
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 100,
        isUnique: async (slug, context) => {
          const {document, path, type} = context

          const baseId = getBaseIdFromId(document._id)
          const docType = document._type
          const atPath = serializePath(path.concat('current'))

          const t = await isSlugUnique(slug, context)

          // log baseId and isSlugUnique returned value
          console.log(baseId, t)
          console.log('--')

          // copy the whole isSlugUnique function from 
          // https://github.com/sanity-io/document-internationalization/blob/main/src/validators/isSlugUnique.ts#L7
          const constraints = [
            '_type == $docType',
            '!(_id match $baseId || _id in path("i18n." + $baseId + ".*") || _id in path("drafts.**"))',
            `${atPath} == $slug`,
          ].join(' && ')

          getSanityClient().fetch(
            `!defined(*[${constraints}][0]._id)`,
            {
              docType,
              // USE unprefixDraftId TO GET THE REAL ID WITHOUT 'drafts.' PREFIX
              baseId: unprefixDraftId(baseId),
              slug,
            },
            {tag: 'validation.slug-is-unique'}
          ).then(console.log).then(() => console.log('============'))

          return t
        }
      },
    },
    {
      name: 'overview',
      title: 'Overview',
      type: 'blockContent',
    },
    {
      name: 'releaseDate',
      title: 'Release date',
      type: 'datetime',
    },
    {
      name: 'externalId',
      title: 'External ID',
      type: 'number',
    },
    {
      name: 'popularity',
      title: 'Popularity',
      type: 'number',
    },
    {
      name: 'poster',
      title: 'Poster Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'castMembers',
      title: 'Cast Members',
      type: 'array',
      of: [{type: 'castMember'}],
    },
    {
      name: 'crewMembers',
      title: 'Crew Members',
      type: 'array',
      of: [{type: 'crewMember'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'releaseDate',
      media: 'poster',
      castName0: 'castMembers.0.person.name',
      castName1: 'castMembers.1.person.name',
    },
    prepare(selection) {
      const year = selection.date && selection.date.split('-')[0]
      const cast = [selection.castName0, selection.castName1].filter(Boolean).join(', ')

      return {
        title: `${selection.title} ${year ? `(${year})` : ''}`,
        date: selection.date,
        subtitle: cast,
        media: selection.media,
      }
    },
  },
}
