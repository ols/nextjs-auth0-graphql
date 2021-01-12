import React, { Component } from "react";

import auth0 from "./auth0";
import { fetchUser } from "./user";
import createLoginUrl from "./urlHelper";
import RedirectToLogin from "./loginRedirect";
import { IncomingMessage } from "http";

type AuthenticatedProps = {
  user?: any;
  loading: boolean;
  children: React.ReactChild | React.ReactChildren;
};

export default function withAuth(
  InnerComponent: React.ElementType | React.FunctionComponent
): React.ComponentType {
  return class Authenticated extends Component<AuthenticatedProps> {
    static async getInitialProps(ctx: {
      req: IncomingMessage;
      res: {
        writeHead: (arg0: number, arg1: { Location: string }) => void;
        end: () => void;
      };
    }) {
      if (!ctx.req) {
        const user = await fetchUser();
        return {
          user,
        };
      }

      const session = await auth0.getSession(ctx.req);
      if (!session || !session.user) {
        ctx.res.writeHead(302, {
          Location: createLoginUrl(ctx.req.url),
        });
        ctx.res.end();
        return;
      }

      return { user: session.user };
    }

    constructor(props: any) {
      super(props);
    }

    render() {
      if (!this.props.user) {
        return <RedirectToLogin />;
      }

      return (
        <div>{<InnerComponent {...this.props} user={this.props.user} />}</div>
      );
    }
  };
}
