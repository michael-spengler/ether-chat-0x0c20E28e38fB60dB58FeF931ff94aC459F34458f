
import { Logger }  from 'https://deno.land/x/log@v0.6.1/mod.ts'
import { Persistence } from "https://deno.land/x/persistence@v1.4.0/persistence.ts"

export const logger = await Logger.getInstance("DEBUG", "ERROR", "./warnings-errors.txt")

// export const nlpProvider = 'http://localhost:3010'
export const nlpProvider = 'https://fancy-chats.com:4443'

