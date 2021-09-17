import React from "react";
import {useSelector} from "react-redux";
import {Redirect, Route} from "react-router-dom";

export default function AuthenticatedRoute({component: Component, ...rest}) {
    const {User} = useSelector((state) => state);
    return (
        <Route
            {...rest}
            render={(props) =>
                User && User.isAuthenticated ? (
                    <Component {...props}></Component>
                ) : (
                    <Redirect to="/"/>
                )
            }
        ></Route>
    );
}
