import fs from 'fs/promises'
import process from 'process'

import { TOKEN_PATH, CREDENTIALS_PATH } from './gcal_common.ts'

const GOOG_CREDS = process.env.GOOGLE_CREDENTIALS_JSON
const GOOG_TOKEN = process.env.GOOGLE_TOKEN_JSON

// Google authenticate instructions use require local files to be read, rather than passed as variables. This works around that by writing them out beforehand.

const main = async() => {
  try {
    console.log('Writing out Google credentials to JSON from environment variables')
    await fs.writeFile(CREDENTIALS_PATH, GOOG_CREDS)
    await fs.writeFile(TOKEN_PATH, GOOG_TOKEN)
  } catch (e) {
    console.error(e)
  }
}

main()
