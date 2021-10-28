import React, { useState, useEffect, createContext } from "react";
import { auth } from '../firebase';
import { apiProvider } from "./Provider";

export const UserContext = createContext(null);

function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const [org, setOrg] = useState(null);
    useEffect(() => {
        auth.onAuthStateChanged(userAuth => {
            setUser(userAuth);
        })
    }, [])

    useEffect(() => {
        if (user) {
            apiProvider.getSingle('orgs', user.id, setOrg)
        }
    }, [user])

    const contextValue = {
        user,
        org
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}
export default UserProvider;