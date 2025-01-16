import fs from 'fs/promises'
import process from 'process'
import { dump, load } from 'js-yaml'
import TsConstructor from 'turndown'
import { TOKEN_PATH, CREDENTIALS_PATH } from './gcal_common.ts'
import { authenticate } from '@google-cloud/local-auth'
import { google } from 'googleapis'
import { add, sub, formatRFC3339 } from 'date-fns'

const SCOPES: string[] = ['https://www.googleapis.com/auth/calendar.readonly']
const MEETUPS_CALENDAR_ID: string = process.env.PUBLIC_MEETUPS_CALENDAR_ID as string
const SHOWS_CALENDAR_ID: string = process.env.PUBLIC_SHOWS_CALENDAR_ID as string

// TODO: add types, then remove this linting opt out
/* eslint-disable @typescript-eslint/no-explicit-any */

const now: Date = new Date()
const threeMonthsFromNow: Date = add(now, { months: 3 })
const threeMonthsAgo: Date = sub(now, { months: 3 })
const contentDir: string = 'src/content'
const markdownExtension: string = '.mdx'

const turndownService: TsConstructor = new TsConstructor()

turndownService.addRule('removeLinks', {
  filter: ['a'],
  replacement: (content: string): string => {
    return content
  }
})

async function loadSavedCredentialsIfExist(): Promise<any | null> {
  try {
    const content: string = await fs.readFile(TOKEN_PATH, 'utf-8')
    const credentials: any = JSON.parse(content)
    return google.auth.fromJSON(credentials)
  } catch (err) {
    return null
  }
}

async function saveCredentials(client: any): Promise<void> {
  const content: string = await fs.readFile(CREDENTIALS_PATH, 'utf-8')
  const keys: any = JSON.parse(content)
  const key: any = keys.installed || keys.web
  const payload: string = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  })
  console.log('Saving token.json...')
  await fs.writeFile(TOKEN_PATH, payload)
  console.log('Saved.')
}

async function authorize(): Promise<any> {
  let client: any = await loadSavedCredentialsIfExist()
  if (client) {
    return client
  }
  console.log(`No existing token file found, reauthenticating with credentials from ${CREDENTIALS_PATH}`)
  try {
    client = await authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH,
    })  
  } catch (e) {
    console.error(e)
  }
  if (client.credentials) {
    console.log('Authentication response received, calling saveCredentials...')
    await saveCredentials(client)
    console.log('Credentials saved.')
  }
  console.log('Finishing authorize()')
  return client
}

const stripUnnededProps = (event: any): any => {
  const {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    etag,
    ...remainder
  } = event
  return remainder
}

// TODO: something less hacky
const isRich = (str: string): boolean =>
  str?.indexOf('<p') > -1 ||
  str?.indexOf('<br') > -1

const writeOutEvents = async (events: any, targetDir: string): Promise<void> => {
  if (!events || events.length === 0) {
    console.log('No events found.')
    return
  }
  await Promise.all(events.map(async (event: any) => {
    const sanitized: any = load(dump(event, { sortKeys: true }))
    const frontMatterObj: any = {
      id: event.id,
      description: event.description,
      start: event.start.dateTime,
      end: event.end.dateTime,
      title: event.summary,
      location: event.location,
      originalCal: stripUnnededProps(sanitized),
    }

    // gcal can sometimes send plain text, detect because the conversion to markdown removes whitespace
    const content = isRich(event.description)
      ? turndownService.turndown(event.description)
      : event.description

    const yaml: string = `---\n${dump(frontMatterObj)}\n---\n${content}`

    const parentDir: string = `${targetDir}/${sanitized.id}`
    await fs.mkdir(parentDir, { recursive: true })

    console.log(`Writing out event: ${frontMatterObj.title} @ ${frontMatterObj.start}`)

    await fs.writeFile(`${parentDir}/index${markdownExtension}`, yaml)
  }))
}

async function gatherEvents(auth: any, dirName: string, calendarId: string): Promise<void> {
  const calendar = google.calendar({ version: 'v3', auth })
  const common: any = {
    calendarId: calendarId,
    maxResults: 100,
    singleEvents: true,
    orderBy: 'startTime'
  }
  const upcoming: any = {
    ...common,
    timeMin: formatRFC3339(new Date()),
    timeMax: formatRFC3339(threeMonthsFromNow)
  }
  const past: any = {
    ...common,
    timeMin: formatRFC3339(threeMonthsAgo),
    timeMax: formatRFC3339(new Date())
  }
  const targetDir: string = `${contentDir}/${dirName}`
  await fs.rm(targetDir, { recursive: true, force: true })
  await fs.mkdir(targetDir)
  const pastRes = await calendar.events.list(past)
  const pastEvents = pastRes.data?.items
  if (pastEvents && pastEvents.length > 0) {
    console.log(`Writing out ${pastEvents.length} past events to ${targetDir}...`)
    await writeOutEvents(pastEvents, targetDir)
  }
  const upcomingRes = await calendar.events.list(upcoming)
  const upcomingEvents = upcomingRes.data?.items
  if (upcomingEvents && upcomingEvents.length > 0) {
    console.log(`Writing out ${upcomingEvents.length} upcoming events to ${targetDir}...`)
    await writeOutEvents(upcomingEvents, targetDir)
  }
}

async function main(): Promise<void> {
  try {
    const auth: any = await authorize()
    await gatherEvents(auth, 'meetups', MEETUPS_CALENDAR_ID)
    await gatherEvents(auth, 'shows', SHOWS_CALENDAR_ID)
  } catch (e) {
    console.error(e)
    throw(e)
  }
}

main()

/* eslint-enable @typescript-eslint/no-explicit-any */
