import { ApolloProvider } from "@apollo/react-hooks";
import withApollo from "next-with-apollo";
import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:8080/v1/graphql",
  credentials: 'include'
});

const authLink = setContext(async () => {
  const res = await fetch('/api/session');
  const session = res.ok ? await res.json() : null;
  const token = session ? session.idToken : null
  return {
    headers: {
      Authorization: token ? `Bearer ${session.idToken}` : '',
    },
  };
});

export default withApollo(
  ({ initialState }): any => {
    return new ApolloClient({
      credentials: "include",
      link: authLink.concat(httpLink),
      cache: new InMemoryCache().restore(initialState || {}),
    });
  },
  {
    render: ({ Page, props }) => {
      const { apollo } = props;
      return (
        <ApolloProvider client={apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);
