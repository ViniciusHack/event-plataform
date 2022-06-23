import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri:'https://api-sa-east-1.graphcms.com/v2/cl4nbvark8pfn01yr35hwatvp/master',
  cache: new InMemoryCache()
});