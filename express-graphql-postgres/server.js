const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { dbSetUp } = require("./db");
const { typeDefs } = require("./schemas");
const { resolvers } = require("./resolvers");
const jwt = require("jsonwebtoken");

const app = express();

const PORT = process.env.PORT || 4000;

dbSetUp();

// Create the Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    try {
      const user = jwt.verify(token, "secretkey");
      return { user };
    } catch (err) {
      return {};
    }
  },
});

server.start().then(() => {
  server.applyMiddleware({ app });
  // Start the server
  app.listen({ port: PORT }, () =>
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
});
