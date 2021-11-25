import fs from 'fs'

export const typeDefs = fs
  .readFileSync(
    process.env.GRAPHQL_SCHEMA || 'api/schema.graphql'
  )
  .toString('utf-8')
