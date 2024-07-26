"use client";
import { createContext, useContext, useState } from "react";

const FileContext = createContext();
export const useFile = () => useContext(FileContext);
export default function Provider({ children }) {
    const [filename, setFilename] = useState("");
    const [fileData, setFileData] = useState(""); // 이미지 데이터를 저장할 상태 추가

    return (
        <FileContext.Provider
            value={{ filename, setFilename, fileData, setFileData }}
        >
            {children}
        </FileContext.Provider>
    );
}
