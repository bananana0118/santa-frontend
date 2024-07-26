"use client"
import { createContext, useContext, useState } from "react";

const FileContext = createContext();
export const useFile = () => useContext(FileContext);
export default function Provider({ children }) {
    const [filename, setFilename] = useState("");

    return (
        <FileContext.Provider value={{ filename, setFilename }}>
            {children}
        </FileContext.Provider>
    );
}
