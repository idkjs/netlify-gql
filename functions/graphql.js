const { ApolloServer, gql } = require('apollo-server-lambda')
const {
  getPlaces,
  addPlace
} = require("./places");

const typeDefs = gql`
type Place {
    id: ID!,
    name: String!,
    city: String,
    address: String!,
    phone1: String,
    phone2: String,
    email: String,
    url: String,
    lat: String,
    lng: String,
    category: String!,
  },
  type Query {
    hello: String,
    places: [Place],
    place(id: String!): Place,
  },
  type Mutation {
    createPlace(name: String!, description: String!): String,
  }
`

const resolvers = {
  Query: {
    hello: (root, args, context) => {
      return 'Hello, world!'
    },
    places: () => {
      return getPlaces();
    },
    place: ({
      id
    }) => {
      const places = getPlaces();
      return places.find(p => p.id === id);
    },
    createPlace: args => {
      const {
        name,
        description
      } = args;
      const newPlace = addPlace(name, description);
      return `Created: ${newPlace.id} ${newPlace.name} - ${
        newPlace.description
      }`;
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

exports.handler = server.createHandler()
