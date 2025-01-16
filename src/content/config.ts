import { defineCollection, z } from 'astro:content'

const dateable = {
  date: z.coerce.date(),
}

const titleable = {
  title: z.string(),
  description: z.string(),
}

const draftable = {
  draft: z.boolean().optional()
}

export const blog = defineCollection({
  type: 'content',
  schema: z.object({
    ...dateable,
    ...titleable,
    ...draftable
  }),
})

export const events = defineCollection({
  type: 'content',
  schema: z.object({
    ...dateable,
    ...titleable,
    ...draftable,
    youTubeId: z.string().optional(),
  }),
})

export const meetups = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    description: z.string().optional(),
    start: z.coerce.date(),
    end: z.coerce.date(),
    title: z.string(),
    location: z.string().optional(),
    youTubeId: z.string().optional(),
  }),
})

export const shows = meetups

export const about = defineCollection({
  type: 'content',
  schema: z.object({
    ...titleable,
  }),
})

export const work = defineCollection({
  type: 'content',
  schema: z.object({
    company: z.string(),
    role: z.string(),
    dateStart: z.coerce.date(),
    dateEnd: z.union([z.coerce.date(), z.string()]),
  }),
})

export const collections = {
  about,
  blog,
  events,
  meetups,
  shows,
  work,
}
