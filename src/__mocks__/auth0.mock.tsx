import { WithAuth0Props } from "@auth0/auth0-react";
import React from "react";

jest.mock("@auth0/auth0-react", () => {
  const auth0 = {
    isLoading: false,
    user: { name: "name" },
    isAuthenticated: true,
    loginWithRedirect: jest.fn(),
  };

  return {
    withAuth0: <P extends WithAuth0Props>(
      Component: React.ComponentType<P>
    ): React.ComponentType<Omit<P, keyof WithAuth0Props>> => {
      return function WithAuth(props): React.JSX.Element {
        return <Component {...(props as P)} auth0={auth0} />;
      };
    },
    Auth0Provider: ({ children }: { children?: any }) => children,
    useAuth0: () => {
      return auth0;
    },
  };
});

export default {};
