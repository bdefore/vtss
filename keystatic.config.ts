import { config, fields, collection } from '@keystatic/core'

// TODO: unified schema for astro / keystatic 

const base = {
  content: fields.markdoc({
    label: 'Content',
  }),
}

const dateable = {
  date: fields.date({
    label: 'Publish Date',
    validation: {
      isRequired: true
    }
  }),
}

const titleable = {
  title: fields.slug({ name: { label: 'Title' } }),
  description: fields.text({ label: 'Description' }),
}

const draftable = {
  draft: fields.checkbox({ label: 'Draft' }),
}

const post = {
  ...draftable,
  ...titleable,
  ...dateable,
  ...base,
}

export default config({
  storage: {
    kind: 'github',
    repo: 'bdefore/vtss',
  },

  collections: {
    about: collection({
      label: 'About',
      slugField: 'title',
      path: 'src/content/about/*',
      format: { contentField: 'content' },
      schema: {
        ...titleable,
        ...base,
      },
    }),
    // GCal is now the source of truth for events, disabling keystatic access
    // events: collection({
    //   label: 'Events',
    //   slugField: 'title',
    //   path: 'src/content/events/*',
    //   format: { contentField: 'content' },
    //   schema: {
    //     ...post,
    //     youTubeId: fields.text({ label: 'YouTube ID' }),
    //   },
    // }),
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        ...post,
      },
    }),
  },
})
