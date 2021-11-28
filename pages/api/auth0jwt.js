import { verify } from "jsonwebtoken"
import jwksClient from "jwks-rsa"

const client = jwksClient(
    {
        jwksUri: `${process.env.AUTH0_ISSUER_BASE_URL}/.well-known/jwks.json`
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

export default function isTokenValid( token )
{
    token = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNaMjVqVXcwdWo0NHp2Y216aEtDSiJ9.eyJpc3MiOiJodHRwczovL2Rldi1iNWh5bWZ0ZS51cy5hdXRoMC5jb20vIiwic3ViIjoiT3l1OWV1N0Y0N3hsbFBMOUhTT1FpOTZaTTVxbHI0eVFAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcHJvc3BlY3RzLWdxbC52ZXJjZWwuYXBwL2FwaS9ncmFwaHFsIiwiaWF0IjoxNjM4MDczMDE2LCJleHAiOjE2MzgxNTk0MTYsImF6cCI6Ik95dTlldTdGNDd4bGxQTDlIU09RaTk2Wk01cWxyNHlRIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.oMtAkOUwi5rThVpxfUoQiTgLXSbHc5pYgtxCKHzIlT_pnvgpoEXzjkmjlslCsJDztKrhuEMnAnLsuSZj9bvRSyPtJZ_tw-Cs6E6Q6VimUmYT9G-tUetLpJTkGyKtWjVb0dU6fEyJWaUhueuhqKqfYTvHHe1j36cjCdirqak2VzR1YufMaWtL7rcwL1BL-G4kApl2huE6h7A_FkybIqfc1z1aU72mgb7ouMzRebEuPtX8h6WPNWH58EZCXztLSoUvjhQ-Coz_HRrvAT02mQrQDyyWFR8FbjVoLmgoKMCYJmgQDprAeiKfDCE8aoj48_QcjqCDHcxlZwx92rbpUs00oQ'
    if (!Boolean(token))
    {
        return Promise.reject( { error: "No token provided", message: "No token provided" } )
    }

    const bearerToken = token.split(" ");

    return new Promise( (resolve, reject) => {
            verify(
                bearerToken[1],

                getKey,

                {
                    audience: `${process.env.AUTH0_BASE_URL}/api/graphql`,
                    issuer: process.env.AUTH0_ISSUER_BASE_URL,
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