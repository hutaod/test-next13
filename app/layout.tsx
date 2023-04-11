import { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "Next",
  description: "Generated by create next app",
  viewport: "width=device-width, initial-scale=1", // 会自动添加
}

export default function RootLayout({ children }: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body className="body">{children}</body>
    </html>
  );
}