import fs from 'fs'

export const typeDefs = fs
  .readFileSync(
    process.env.GRAPHQL_SCHEMA || 'pages/api/schema.graphql'
  )
  .toString('utf-8')
