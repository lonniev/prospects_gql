import fs from 'fs'

export const typeDefs = fs
  .readFileSync(
    process.env.GRAPHQL_SCHEMA || __dirname + 'schema.graphql'
  )
  .toString('utf-8')

  