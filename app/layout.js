// app/layout.js
import "./globals.css";
import Navbar from "./components/Navbar";
import { Geist } from "next/font/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    display: "swap",
});

export const metadata = {
    title: "Marketplace",
    description: "Buy and sell companies",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={geistSans.variable}>
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
