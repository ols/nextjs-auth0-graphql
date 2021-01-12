import React from 'react';

import Layout from '../components/layout';
import withAuth from '../lib/withAuth';
import { UserProfile } from '../lib/user';

type ProfileProps = { user: UserProfile };

const Profile = ({ user }: ProfileProps) => (
  <Layout loading={false} user={user}>
    <h1>Profile</h1>

    <div>
      <h3>Profile (server rendered)</h3>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  </Layout>
);

export default withAuth(Profile);
