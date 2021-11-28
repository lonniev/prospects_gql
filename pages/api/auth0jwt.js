import { verify } from "jsonwebtoken"
import jwksClient from "jwks-rsa"

const client = jwksClient(
    {
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }
)

function getKey( header, callback )
{
  client.getSigningKey( header.kid, (error, key) => {
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
        }
    )
}

async function isTokenValid( token )
{
  if (token)
  {
    const bearerToken = token.split(" ");

    return new Promise( (resolve, reject) => {
            verify(
                bearerToken[1],

                getKey,

                {
                    audience: process.env.API_IDENTIFIER,
                    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
                    algorithms: ["RS256"]
                },
                
                (error, decoded) => {
                    if (error)
                    {
                        reject( { error } )
                    }

                    if (decoded)
                    {
                        resolve( { decoded } )
                    }
                }
            )
        }
    )
  }

  return Promise.reject( { error: "No token provided", message: "No token provided" } )
}

export default isTokenValid