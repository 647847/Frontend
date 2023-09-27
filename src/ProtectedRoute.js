import React from "react";
import { Redirect, Route } from "react-router-dom";

export function ProtectedRoute({ component: Component, ...restOfProps }) {
  const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        console.log("login first")
        return <Redirect to="/login" />;
      }

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}