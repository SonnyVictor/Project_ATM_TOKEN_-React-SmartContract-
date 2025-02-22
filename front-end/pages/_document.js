import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      lang="en"
      className="scroll-smooth"
      style={{ scrollBehavior: "smooth" }}
    >
      <Head />
      <body className="bg-slate-700">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
