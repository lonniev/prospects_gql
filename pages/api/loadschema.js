import fs from 'fs'
import { join } from 'path'

export const typeDefs = fs
  .readFileSync(
    join( process.cwd(), 'schema.graphql' )
  )
  .toString('utf-8')

  