import "@/app/styles/global.css";
import Header from "./components/header/Header";
import { THEME_COLOR } from "@/lib/colors";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const viewport = {
  themeColor: THEME_COLOR,
};

export default function LocaleLayout({ children }) {
  return (
    <html>
      <body
        className="antialiased
          bg-linear-to-r from-white to-[#ffe6ff]
          overflow-x-hidden text-black font-shabnam"
      >
        <Header />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
