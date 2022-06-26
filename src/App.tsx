import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./contexts/AuthContext";
import { client } from "./lib/apollo";
import { Router } from './Router';

export function App() {
  return (
    <ApolloProvider client={client}>
        <BrowserRouter>
          <AuthProvider>
            <Router />
            <ToastContainer />
          </AuthProvider>
        </BrowserRouter>
    </ApolloProvider>
  )
}