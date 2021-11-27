import { gql, ApolloServer } from "apollo-server-micro"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import {Neo4jGraphQL} from "@neo4j/graphql"
import neo4j from "neo4j-driver"
import 'ts-tiny-invariant' // importing this module as a workaround for issue described here: https://github.com/vercel/vercel/discussions/5846

import { typeDefs } from "./loadschema"

import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'

const driver = neo4j.driver(
    process.env.NEO4J_URI || 'bolt://localhost:7687',
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
)

const neoSchema = new Neo4jGraphQL({typeDefs, driver})

const apolloServer = new ApolloServer({
  schema: neoSchema.schema,
  playground: true,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default withApiAuthRequired( async function handler(req, res) {
    try {
      const { accessToken } = await getAccessToken(req, res);

      await startServer;
      await apolloServer.createHandler({
        path: "/api/graphql",
      })(req, res);

    } 
    catch(error) 
    {
      console.error(error)
      res.status(error.status || 500).end(error.message)
    }
  }
)

export const config = {
  api: {
    bodyParser: false,
  },
};
