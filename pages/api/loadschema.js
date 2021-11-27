import fs from 'fs'
import { join } from 'path'

// Since Next.js compiles your code into a separate directory
// you can't use __dirname as the path it will return will be different from the pages directory.
// Instead you can use process.cwd() 
// which gives you the directory where Next.js is being executed.

export const typeDefs = fs
  .readFileSync(
    join( process.cwd(), 'api', 'schemas', 'schema.graphql' )
  )
  .toString('utf-8')
