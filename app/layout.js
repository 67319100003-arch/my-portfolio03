import { Kanit, Sarabun } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  weight: ["400", "600", "700", "800", "900"],
  subsets: ["latin", "thai"],
  variable: "--font-kanit",
  display: "swap",
});

const sarabun = Sarabun({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-sarabun",
  display: "swap",
});

export const metadata = {
  title: "วิทยาลัยพณิชยการธนบุรี (TCC)",
  description: "มุ่งมั่นสร้างสรรค์ ยกระดับวิชาชีพ สู่มาตรฐานสากล — วิทยาลัยพณิชยการธนบุรี กรุงเทพมหานคร",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" className={`${kanit.variable} ${sarabun.variable}`}>
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
