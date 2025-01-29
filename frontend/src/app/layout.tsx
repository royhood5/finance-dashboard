import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yahoo Finance Dashboard",
  description: "Yahoo Finance Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen w-full  text-white flex", inter.className, {
          "debug-screens": process.env.NODE_ENV === "development",
        })}
      >
        <Sidebar />
        <div className="p-8 w-full">
          {" "}
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
