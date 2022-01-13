import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

const AuthRoute = props => {
    const currentState = useSelector(state => state.auth);
    const { type } = props;

    if (type === "guest" && currentState.isLoggedIn) {
        return <Redirect to="/" />;
    } else if (type === "private" && !currentState.isLoggedIn) {
        return <Redirect to="/auth/login" />;
    }

    return <Route {...props} />;
};

export default AuthRoute;