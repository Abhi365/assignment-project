// Define the GraphQL schema
const typeDefs = `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    gender: String!
  }

  type Location {
    lat: Float!
    lng: Float!
  }

  type UserWithLocation {
    id: ID!
    firstName: String!
    lastName: String!
    gender: String!
    location: Location!
  }

  type Query {
    users(page: Int!, limit: Int!): [User!]!
    findUsers(radius: Float!): [UserWithLocation!]!
  }

  type Mutation {
    login(email: String!, password: String!): String!
  }
`;

module.exports = { typeDefs };
