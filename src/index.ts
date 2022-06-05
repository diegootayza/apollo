import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { createServer } from 'http'
import { execute, subscribe } from 'graphql'
import { useServer } from 'graphql-ws/lib/use/ws'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { WebSocketServer } from 'ws'
import express from 'express'

import schema from './schema'
import connection from './connection'

const main = async () => {
    await connection()
    const app = express()
    const httpServer = createServer(app)
    // const wsServer = new WebSocketServer({ path: '/graphql', server: httpServer })
    // const serverCleanup = useServer({ schema }, wsServer)
    const subscriptionServer = SubscriptionServer.create({ schema, execute, subscribe }, { path: '/graphql', server: httpServer })

    const apolloServerA = new ApolloServer({
        schema,
        csrfPrevention: true,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                serverWillStart: async () => ({
                    drainServer: async () => {
                        subscriptionServer.close()
                    },
                }),
            },
            // {
            //     serverWillStart: async () => ({
            //         drainServer: async () => {
            //             await serverCleanup.dispose()
            //         },
            //     }),
            // },
        ],
    })

    await apolloServerA.start()

    apolloServerA.applyMiddleware({ app, path: '/graphql', cors: { origin: '*' } })

    httpServer.listen({ port: 4000 }, () => {
        console.log(`🚀 Server ready at http://localhost:4000`)
    })
}

main()
