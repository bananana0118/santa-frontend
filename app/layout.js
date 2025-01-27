import { Inter } from "next/font/google";
import "./globals.css";
import styled from "styled-components";
import localFont from "next/font/local";
import { Suspense } from "react";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import NavBar from "@/components/layout/NavBar";
import Provider from "@/components/layout/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "스마일 포토:모두 만족하는 사진 찍기",
    description: "스마일 포토:모두 만족하는 사진 찍기",
    icons: {
		icon: "/svgIcon/favicon.ico",
	},
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <NavBar />
                    {children}
                </Provider>
            </body>
        </html>
    );
}
