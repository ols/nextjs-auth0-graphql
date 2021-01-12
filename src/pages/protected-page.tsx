import React, { useEffect } from "react";

import Layout from "../components/layout";
import { useFetchUser } from "../lib/user";
import withAuth from "../lib/withAuth";
import gql from 'graphql-tag';

import withApollo from 'lib/withApollo';
import { useQuery } from "@apollo/react-hooks";
export const QUERY_TODO = gql`
query Todos {
  todos {
    id,
    text
  }
}
`;

type Todo = Readonly<{
  text: string;
}>;

type TodoData = Readonly<{
  data: Todo[];
}>;

export function ProtectedPage(): React.ReactElement {
  const { user, loading } = useFetchUser();

  const { data } = useQuery<TodoData>(QUERY_TODO, {
    variables: {},
  });

  useEffect(() => {
  }, [data]);

  return (
    <Layout user={user} loading={loading}>
      <h1>Protected Page</h1>

      {loading && <p>Loading profile...</p>}

      {!loading && user && (
        <>
          <p>Profile:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
    </Layout>
  );
}

export default withAuth(withApollo(ProtectedPage))
