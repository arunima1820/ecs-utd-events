import React, { useState, useEffect, createContext } from "react";
import { apiProvider } from "./Provider";

export const AllOrgContext = createContext(null);

function AllOrgProvider({ children }) {
    const [orgs, setOrgs] = useState([])

    useEffect(() => {
        apiProvider.getAll('orgs', setOrgs)
    }, [])

    return (
        <AllOrgContext.Provider value={orgs}>
            {children}
        </AllOrgContext.Provider>
    );
}
export default AllOrgProvider;