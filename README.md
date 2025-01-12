# About

This is a website to provide a home on the web for Vermont Synthesizer Society and its members. It lists meetups and shows and how to participate.

The site is available at https://www.vtsynth.com (or directly from Netlify at https://vtsynthsociety.netlify.app)

#### Contact

The following members are available on our [Discord](https://discord.gg/NJxqtDTkxa) to help if you need anything:

- Admins:
  - @Acacia Bridge
  - @Burial Woods
- Developers:
  - @tobblestop

Please reach out if the site is borked or anything is unclear or incorrect in this documentation.

## Authoring Content

All members are encouraged to help update the site. Minimal technical expertise is required!

#### Calendars

- Calendar events are managed in two public Google calendars:
  - [Meetups](https://calendar.google.com/calendar/u/2?cid=M2FlZjI4OGQ0MWNhNjI3ZGQxZTk3NWNjY2ZlNjEyN2NkOTZiODYyY2RiZjE5MWEzMTQ2ZWU4Yzk1NGZkNjc1Y0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t)
  - [Shows](https://calendar.google.com/calendar/u/2?cid=YjdiMDUxYWNhY2Y0MTAxMWI4Yjg1OTA3OTllZTNjOWYwNzk4NmQ0NTIxMWYwODgzM2U0MWE2ZjVlNjY3NjdhOUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t)
- If you wish to create or update content on any VTSS calendar, provide an Admin with a Google email to add you as a collaborator.
- Any change to these calendars will rebuild the site, typically right away but may take up to 15 minutes.
- In calendar events, you can add a link to YouTube, Twitter, or Vimeo and it will create an embedded preview on the website. This embedding only occurs if it is on its own line.
- When entering event data in Google Calendar, take care to format the event description carefully and let a Developer know if it doesn't look correct on the website.

#### Resources and About Pages

- The content on these pages is managed by a content management system (CMS). This is similar to other tools you may be familiar with like WordPress. Ours is more basic. It lives right on the site.
- Access to the CMS requires:
  - Create a free account on [Github](https://www.github.com). 
  - Give your Github username to a Developer to add you as a collaborator.
- Once you're approved, visit the CMS at https://www.vtsynth.com/cms (or directly from https://www.vtsynth.com/keystatic).
- Any changes to the CMS will create a commit on Github for you, which will trigger a rebuild of the site on Netlify. This should only take a minute or two.

## Contributing to Website Development

Technical contributors are very welcome! Some expertise will be helpful in JavaScript, HTML, CSS and node.js. Here's a rough outline of how to get started. Note that these steps are used on a Linux Manjaro development machine, and may differ on other operating systems. If something is inaccurate do update this README.

No decisions have yet been made for what remains to be worked on or what tools to use to manage it. You can search the project for TODO for a few ideas.

#### Overview

- This is a serverside-generated (SSR) website utilizing [Astro](https://astro.build/). This means no server is needed to be maintained - all of the web content lives on static files served by a web host.
- Astro allows us to optionally use any frontend framework to author interactive content on the client, but at this point none are used.
- Our web host is currently Netlify, running on @bdefore's paid plan. It lives here: https://app.netlify.com/sites/vtsynthsociety 
- Content in the Resources and About pages is managed via the built-in CMS using [Keystatic](https://keystatic.com/).
- Content in the Calendar page is gathered via the scripts in `src/node` and turned into the markdown files Astro uses to generate web content.

#### Engineering Design

- Keep the site free or as cheap as possible.
- Use common technologies and avoid complexity unless it provides substantial value.
- Empower non-technical users to contribute content to the site as easily as possible.
- Optimize for the mobile experience foremost.

#### Onboarding

Ask a Developer for:

- Collaborator access on the Github repo, then clone https://github.com/bdefore/vtss
- The `.env.keys` file to place in the project root. Do not commit it into version control!
- Access to the Netlify project

NOTE: The vtsynth.com domain was registered by [@bdefore](https://github.com/bdefore) on a fresh account with Namecheap on September 10, 2024 for one year. It would be good to have more than one person who is able to manage this. Please volunteer if interested!

#### Local Setup

- Install node.js at the version specified in `.nvmrc`. You may want to use a node version manager like [nvm](https://github.com/nvm-sh/nvm)
- Install [pnpm](https://pnpm.io), an alternative package manager to npm
- Install project dependencies: `pnpm i`
- Setup credentials for accessing our shared calendars. Only need to run once - these are stored in `/tmp`: `pnpm cal:auth`

#### Development

- Gather events from Google Calendar: `pnpm cal:pull`
- Run the local development environment: `pnpm dev:network`. You should then be able to access the site at the address output in the terminal.
- Run the linter: `pnpm lint` (or `pnpm lint:fix`). Try to do this before committing changes.
- To mimic locally what happens in Netlify, you can run: `pnpm build`. This shouldn't be necessary unless deployments are failing.
