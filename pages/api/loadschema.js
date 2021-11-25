import fs from 'fs'

export const typeDefs = fs
  .readFileSync(
    process.env.GRAPHQL_SCHEMA || 'schema.graphql'
  )
  .toString('utf-8')
