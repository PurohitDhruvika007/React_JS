import React from "react";
import SignIn from "../SignIn/SignIn";

export default function PrivateRoute({ children }) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    return user.email ? children : <SignIn />;
}
