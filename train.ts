import { Persistence } from "https://deno.land/x/persistence@v1.4.0/persistence.ts"
import { Request } from 'https://deno.land/x/request@1.3.0/mod.ts'
import { logger, nlpProvider } from './config.ts'

const url = `${nlpProvider}/train`
const response = await Request.post(url, await getTrainingData())
logger.info(response)


async function getTrainingData() {
    const fileContent = await Persistence.readFromLocalFile(`${Deno.cwd()}/0x0c20E28e38fB60dB58FeF931ff94aC459F34458f.json`)
    return fileContent.trainingData
}