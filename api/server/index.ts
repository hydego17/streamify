import './env';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';

import nextApp from '@streamify/app';

import createSchema from '../schema';
import createSession from '../session';

const port = process.env.PORT || 8000;
const handle = nextApp.getRequestHandler();

async function createServer() {
  try {
    // 1. create mongoose connection
    await createSession();
    // 2. create express server
    const app = express();

    // allow CORS from client app
    const corsOptions = {
      // This line is removed when using nextApp module
      // origin: 'http://localhost:3000',
      credentials: true,
    };

    app.use(cors(corsOptions));
    // allow JSON requests
    app.use(express.json());

    const schema = await createSchema();

    // 3. create GraphQL server
    const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
      introspection: true,
      // enable GraphQL Playground with credentials
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
    });

    apolloServer.applyMiddleware({ app, cors: corsOptions });

    // create a next app request handler
    // prepare the next app
    await nextApp.prepare();
    app.get('*', (req, res) => handle(req, res));

    // start the server
    app.listen({ port }, () => {
      console.log(
        `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
      );
      console.log(
        `🚀 Next.js ready at http://localhost:${port}`
      );
    });
  } catch (err) {
    console.log(err);
  }
}

createServer();
