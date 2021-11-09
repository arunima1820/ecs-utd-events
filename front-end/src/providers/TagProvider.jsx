import React, { useState, useEffect, createContext } from "react";
import { apiProvider } from "./Provider";

export const AllTagContext = createContext(null);

function AllTagProvider({ children }) {
    const [tags, setTags] = useState([])

    useEffect(() => {
        apiProvider.getAll('tags', setTags)
    }, [])

    return (
        <AllTagContext.Provider value={tags}>
            {children}
        </AllTagContext.Provider>
    );
}
export default AllTagProvider;