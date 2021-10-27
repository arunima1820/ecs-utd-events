import React, { useState, useEffect, createContext } from "react";
import { apiProvider } from "./Provider";

export const AllEventContext = createContext(null);

function AllEventProvider({ children }) {
    const [events, setEvents] = useState([])

    useEffect(() => {
        apiProvider.getAll('events', setEvents)
    }, [])

    return (
        <AllEventContext.Provider value={events}>
            {children}
        </AllEventContext.Provider>
    );
}
export default AllEventProvider;