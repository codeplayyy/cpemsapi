const { gql, UserInputError } = require('apollo-server');

// Import functions
const create = require('../models/organisation/functions/create');
const update = require('../models/organisation/functions/update');

const typeDefs = gql`
    # Query
    type Organisation {
        _id: ID!,
        name: String!
    }

    extend type Query {
        organisation(_id: ID!): Organisation!
    }

    # Mutation
    extend type Mutation {
        organisation_create(name: String!): Organisation!
    }

    # Subscription
`;

const resolvers = {
    // Query

    // Mutation
    Mutation: {
        organisation_create: async (_, { name }) => {
            try {
                return create(name);
            } catch(error) {
                throw new UserInputError(error);
            }
        },
    }

    // Subscription
}

module.exports = {
    typeDefs,
    resolvers
}