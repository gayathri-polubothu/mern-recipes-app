'use client';

import { createContext, useContext, useState } from "react";
const UserContext = createContext({})

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
};

export const useUserContext = () => useContext(UserContext);