import {
  Nunito,
  Ubuntu,
  Kanit,
  Roboto_Mono,
  Lobster,
  Abril_Fatface,
} from "next/font/google";
export const ubuntu = Ubuntu({
  subsets: ["latin"],
  variable: "--font-ubuntu",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "700"],
});

export const kanit = Kanit({
  subsets: ["latin"],
  variable: "--font-kanit",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
export const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const lobster = Abril_Fatface({
  subsets: ["latin"],
  variable: "--font-kanit",
  style: ["normal"],
  weight: ["400"],
});
