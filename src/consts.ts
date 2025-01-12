import type { Site, Metadata, Socials } from '@types'

export const SITE: Site = {
  NAME: 'VTSS',
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_EVENTS_ON_HOMEPAGE: 3,
}

export const HOME: Metadata = {
  TITLE: 'Home',
  DESCRIPTION: 'Vermont Synthesizer Society',
}

export const ABOUT: Metadata = {
  TITLE: 'About',
  DESCRIPTION: 'Who is the Vermont Synth Society?'
}

export const BLOG: Metadata = {
  TITLE: 'Resources',
  DESCRIPTION: 'A collection of articles on topics related to synthesizers.',
}

export const EVENTS: Metadata = {
  TITLE: 'Events',
  DESCRIPTION: 'Events that we\'ve put on.',
}

export const SOCIALS: Socials = [
  {
    NAME: 'discord',
    HREF: 'https://discord.gg/NJxqtDTkxa',
  },
  { 
    NAME: 'youtube',
    HREF: 'https://www.youtube.com/channel/UC_u175Z58JY0ytndAcuLAjg',
  },
  {
    NAME: 'facebook',
    HREF: 'https://www.facebook.com/groups/vtsynthsociety/about/',
  },
  // {
  //   NAME: 'twitter',
  //   HREF: 'https://twitter.com/tbd-vtss',
  // },
  // { 
  //   NAME: "github",
  //   HREF: "https://github.com/tbd-vtss"
  // }
  // { 
  //   NAME: "linkedin",
  //   HREF: "https://www.linkedin.com/in/markhorn-dev",
  // }
]
