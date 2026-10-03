import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Storybook Edit | Dearly",
  description: "A story-led wedding invitation.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}