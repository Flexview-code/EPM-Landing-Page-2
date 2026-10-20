import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://easypm-design-partners.keeneagle64.chatgpt.site"),
  title: "EasyPM — More capacity. Better managed.",
  description: "AI-assisted workflows for Ontario condominium managers. Help shape a more connected way to prepare reports, organize corporation information, and move work forward.",
  openGraph: { title: "EasyPM — More capacity. Better managed.", description: "Less paperwork. More property management. Join the design-partner conversation.", type: "website" },
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
