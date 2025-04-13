import gql  from 'graphql-tag'; 

export const typeDefs = gql`
    type ShortURL{
        code: String!
        url: String!
    }

    type Query{
        getURL(code: String!): ShortURL
    }

    type Mutation{
        shortenURL(url: String!): ShortURL!
        updateURL(code: String!, newURL: String!): ShortURL!
        deleteURL(code: String!): Boolean!
    }
`;

