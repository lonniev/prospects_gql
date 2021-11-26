import fs from 'fs'
import { join } from 'path'

export const typeDefs = fs
  .readFileSync(
    join( __dirname, 'schemas', 'schema.graphql' )
  )
  .toString('utf-8')
