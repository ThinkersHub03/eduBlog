import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/layout/bottom-nav";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import ReduxProvider from "@/components/providers/ReduxProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import ToastProvider from "@/components/providers/ToastProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: {
        default: "EduPortal - Educational Digital Portal",
        template: "%s | EduPortal",
    },
    description: "Your one-stop destination for academic resources, admissions, jobs, and past papers.",
    keywords: ["education", "portal", "admissions", "jobs", "past papers", "notes"],
    authors: [{ name: "EduPortal Team" }],
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://eduportal.com",
        title: "EduPortal - Educational Digital Portal",
        description: "Your one-stop destination for academic resources, admissions, jobs, and past papers.",
        siteName: "EduPortal",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} min-h-screen bg-gray-50 font-sans antialiased flex flex-col`}>
                <ReduxProvider>
                    <AuthProvider>
                        <Navbar />
                        <LayoutWrapper>
                            <main className="flex-1 pb-20 md:pb-0">
                                {children}
                            </main>
                            <Footer />
                            <BottomNav />
                        </LayoutWrapper>
                        <ToastProvider />
                    </AuthProvider>
                </ReduxProvider>
            </body>
        </html>
    );
}
