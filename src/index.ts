import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { createServer } from 'http'
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import { WebSocketServer } from 'ws'
import express from 'express'

import schema from './schema'
import connection from './connection'

const main = async () => {
    await connection()
    const app = express()
    const httpServer = createServer(app)
    // const wsServer = new WebSocketServer({ path: '/subscriptions', server: httpServer })
    // const serverCleanup = useServer({ schema }, wsServer)

    const subscriptionServer = SubscriptionServer.create(
        { schema, execute, subscribe, async onConnect(connectionParams: any, webSocket: any, context: any) {} },
        { path: '/subscriptions', server: httpServer }
    )

    const apolloServer = new ApolloServer({
        schema,
        csrfPrevention: false,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                serverWillStart: async () => ({
                    drainServer: async () => {
                        // await serverCleanup.dispose()
                        subscriptionServer.close()
                    },
                }),
            },
        ],
    })

    await apolloServer.start()
    apolloServer.applyMiddleware({ app, cors: { origin: '*' } })

    httpServer.listen({ port: 4000 }, () => {
        console.log(`🚀 Server ready at http://localhost:4000/graphql`)
    })
}

main()
