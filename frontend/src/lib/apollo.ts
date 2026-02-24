import { useAuthStore } from "@/stores/auth";
import {
  ApolloClient,
  ApolloLink,
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { SetContextLink } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = new SetContextLink((prevContext) => {
  const token = useAuthStore.getState().token;
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = new ErrorLink(({ error }) => {
  let isLoggingOut = false;
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, extensions }) => {
      if (
        extensions?.code === "UNAUTHENTICATED" ||
        message.toLowerCase().includes("jwt")
      ) {
        if (!isLoggingOut) {
          isLoggingOut = true;
          useAuthStore.getState().logout();
          window.location.replace("/login");
        }
      }
    });
  }

  if (CombinedProtocolErrors.is(error)) {
    console.error("[Protocol error]", error);
  }

  if (!CombinedGraphQLErrors.is(error) && !CombinedProtocolErrors.is(error)) {
    console.error("[Network error]", error);
  }
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
