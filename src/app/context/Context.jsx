'use client';

import { createContext, useState, useContext } from 'react'
const AppContext = createContext()

export const Store = ({ children }) => {
    const [theme, setTheme] = useState('light')
    return (
        <AppContext.Provider value={{ theme, setTheme }}>
            {children}
        </AppContext.Provider>
    )
}
export function useAppContext() {
    return useContext(AppContext);
}

// export default AppContext
